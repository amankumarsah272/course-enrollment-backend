
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(role?: string, page = 1, limit = 6) {
    const where = role === 'ADMIN' ? {} : { status: 'ACTIVE' as const };

    const [courses, totalCourses] = await Promise.all([
      this.prisma.course.findMany({
        where,
        orderBy: { title: 'asc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.course.count({ where }),
    ]);

    const totalPages = Math.ceil(totalCourses / limit);

    return {
      success: true,
      message: 'Courses fetched successfully',
      courses,
      pagination: {
        currentPage: page,
        pageSize: limit,
        totalCourses,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
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
