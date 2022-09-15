import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from '@/prisma/prisma.service';
import { CreateTemplateDTO } from './dto';

@Injectable()
export class TemplateService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  async createTemplate(dto: CreateTemplateDTO) {
    const template = await this.prisma.template.create({
      data: {
        title: dto.title,
      },
    });

    return template;
  }

  async getTemplates() {
    const templates = await this.prisma.template.findMany();
    return templates;
  }

  async getTemplateById(id: string) {
    const template = await this.prisma.template.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return template;
  }
}
