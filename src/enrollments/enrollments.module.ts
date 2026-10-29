import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EnrollmentsController } from './enrollments.controller.js';
import { EnrollmentsService } from './enrollments.service.js';
import { AuthModule } from '../auth/auth.module.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { RolesGuard } from '../auth/roles.guard.js';

@Module({
  imports: [
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService, AuthGuard, RolesGuard],
})
export class EnrollmentsModule {}


