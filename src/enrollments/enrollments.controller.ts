import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service.js';
import { AuthGuard, RolesGuard } from '../auth/auth.module.js';
import { Roles } from '../auth/roles.decorator.js';

@Controller('enrollments')
@UseGuards(AuthGuard, RolesGuard)
export class EnrollmentsController {
  constructor(
    private readonly enrollmentsService: EnrollmentsService,
  ) {}

  @Post()
  @Roles('STUDENT')
  enroll(@Body() body: { courseId: string }, @Req() req: any) {
    return this.enrollmentsService.enroll(req.user.sub, body.courseId);
  }

  @Get('my')
  @Roles('STUDENT')
  getMyCourses(@Req() req: any) {
    return this.enrollmentsService.getMyCourses(req.user.sub);
  }
}
