
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(role?: string) {
    const courses = await this.prisma.course.findMany({
      where: role === 'ADMIN' ? {} : { status: 'ACTIVE' },
      orderBy: { title: 'asc' },
    });

    return {
      success: true,
      message: 'Courses fetched successfully',
      courses,
    };
  }

  async create(data: {
    title: string;
    description: string;
    duration: string;
    status?: 'ACTIVE' | 'INACTIVE';
  }) {
    if (
      data.status !== undefined &&
      !['ACTIVE', 'INACTIVE'].includes(data.status)
    ) {
      throw new BadRequestException('Invalid course status');
    }

    const course = await this.prisma.course.create({
      data: {
        title: data.title,
        description: data.description,
        duration: data.duration,
        status: data.status ?? 'ACTIVE',
      },
    });

    return {
      success: true,
      message: 'Course created successfully',
      course,
    };
  }

  async updateStatus(id: string, status: 'ACTIVE' | 'INACTIVE') {
    if (!['ACTIVE', 'INACTIVE'].includes(status)) {
      throw new BadRequestException('Status must be ACTIVE or INACTIVE');
    }

    const existingCourse = await this.prisma.course.findUnique({
      where: { id },
    });

    if (!existingCourse) {
      throw new NotFoundException('Course not found');
    }

    const course = await this.prisma.course.update({
      where: { id },
      data: { status },
    });

    return {
      success: true,
      message: 'Course status updated successfully',
      course,
    };
  }

  async remove(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    await this.prisma.course.delete({ where: { id } });

    return {
      success: true,
      message: 'Course deleted successfully',
      deletedCourseId: id,
    };
  }
}
