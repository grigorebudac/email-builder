import { Controller, Get } from '@nestjs/common';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  @Get('me')
  async getMe(): Promise<User> {
    return {
      id: Date.now().toString(),
    };
  }
}
