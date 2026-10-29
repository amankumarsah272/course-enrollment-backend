import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class EnrollmentsService {
  constructor(private readonly prisma: PrismaService) { }


  async enroll(userId: string, courseId: string) {
    const course = await this.prisma.course.findFirst({
      where: {
        id: courseId,
        status: 'ACTIVE',
      },
    });

    if (!course) {
      throw new NotFoundException('Active course not found');
    }

    const existing = await this.prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    if (existing) {
      throw new ConflictException('Already enrolled in this course');
    }

    const enrollment = await this.prisma.enrollment.create({
      data: { userId, courseId },
      include: { course: true },
    });

    return {
      success: true,
      message: 'Course enrolled successfully',
      enrollment,
    };
  }

  async getMyCourses(userId: string) {
    const enrollments = await this.prisma.enrollment.findMany({
      where: { userId },
      include: { course: true },
      orderBy: { enrolledAt: 'desc' },
    });

    return {
      success: true,
      message: 'My courses fetched successfully',
      totalCourses: enrollments.length,
      courses: enrollments,
    };
  }

}
