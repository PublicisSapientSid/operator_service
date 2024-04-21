import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor() {}

  @MessagePattern('health')
  getHello(): string {
    return 'Health Check: OK';
  }
}
