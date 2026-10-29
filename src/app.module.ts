import { Module } from '@nestjs/common';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { CoursesModule } from './courses/courses.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { EnrollmentsModule } from './enrollments/enrollments.module.js';

@Module({
  imports: [PrismaModule, AuthModule, CoursesModule, EnrollmentsModule],
  providers: [AppService],
})
export class AppModule {}
