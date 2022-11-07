import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TemplateModule } from './template/template.module';
import { UserModule } from './user/user.module';
import { EmailsModule } from './emails/emails.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UserModule,
    TemplateModule,
    EmailsModule,
  ],
})
export class AppModule {}
