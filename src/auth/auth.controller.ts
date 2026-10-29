import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    if (
      typeof body?.email !== 'string' ||
      typeof body?.password !== 'string' ||
      !body.email.trim() ||
      !body.password
    ) {
      throw new BadRequestException('Email and password are required');
    }

    return this.authService.login(body.email.trim(), body.password);
  }
}
