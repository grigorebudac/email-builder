import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';
import { AzureADStrategy } from './strategy/azure-ad.strategy';

@Module({
  imports: [JwtModule.register({}), PassportModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AzureADStrategy],
})
export class AuthModule {}
