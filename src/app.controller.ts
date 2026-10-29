import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller('courses')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getCourses() {
    return this.appService.getCourses();
  }
}
