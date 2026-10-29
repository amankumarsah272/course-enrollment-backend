
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CoursesService } from './courses.service.js';
import { AuthGuard, RolesGuard } from '../auth/auth.module.js';
import { Roles } from '../auth/roles.decorator.js';

@Controller('courses')
@UseGuards(AuthGuard, RolesGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }

  @Get()
  findAll(
    @Req() req: any,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const currentPage = Math.max(1, Number(page) || 1);
    const pageSize = Math.min(50, Math.max(1, Number(limit) || 6));

    return this.coursesService.findAll(
      req.user.role,
      currentPage,
      pageSize,
    );
  }

  @Post()
  @Roles('ADMIN')
  create(
    @Body()
    body: {
      title: string;
      description: string;
      duration: string;
      status?: 'ACTIVE' | 'INACTIVE';
    },
  ) {
    return this.coursesService.create(body);
  }

  @Patch(':id/status')
  @Roles('ADMIN')
  updateStatus(
    @Param('id') id: string,
    @Body() body: { status: 'ACTIVE' | 'INACTIVE' },
  ) {
    return this.coursesService.updateStatus(id, body.status);
  }

  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
