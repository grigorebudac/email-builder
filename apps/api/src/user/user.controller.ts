import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '@/auth/guard';
import { GetUserId } from '@/auth/decorator';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  async getMe(@GetUserId() userId: string) {
    return this.userService.getMe(userId);
  }
}
