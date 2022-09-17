import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';

import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '@/prisma/prisma.service';
import { LoginDTO, RegisterDTO } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}

  async register(dto: RegisterDTO) {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
        },
      });

      return this.signToken(user.id);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('User already exists');
        }
      }

      throw error;
    }
  }

  async login(dto: LoginDTO) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: {
          email: dto.email,
        },
      });

      const passwordMatches = await argon.verify(user.password, dto.password);

      if (!passwordMatches) {
        throw new Error('Incorrect password');
      }

      return this.signToken(user.id);
    } catch (error) {
      throw new ForbiddenException('Incorrect email or password');
    }
  }

  async signToken(userId: string) {
    const payload = { sub: userId };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m', // 15 minutes,
      secret: this.config.get('JWT_SECRET'),
    });

    return {
      access_token: token,
    };
  }
}
