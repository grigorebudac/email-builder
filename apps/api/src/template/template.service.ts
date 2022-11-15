import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from '@/prisma/prisma.service';
import { CreateTemplateDTO } from './dto';
import { UpdateTemplateDTO } from './dto/updateTemplate.dto';

@Injectable()
export class TemplateService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  async createTemplate(userId: string, dto: CreateTemplateDTO) {
    const template = await this.prisma.template.create({
      data: {
        title: dto.title,
        subtitle: dto.subtitle,
        content: {},
        userId,
      },
    });

    return template;
  }

  async updateTemplate(id: string, userId: string, dto: UpdateTemplateDTO) {
    const template = await this.prisma.template.updateMany({
      where: {
        AND: [
          {
            id,
          },
          {
            userId,
          },
        ],
      },
      data: {
        content: dto.content,
      },
    });

    return template;
  }

  async getTemplates(userId: string) {
    const templates = await this.prisma.template.findMany({
      where: {
        userId,
      },
    });

    return templates;
  }

  async getTemplateById(id: string, userId: string) {
    const template = await this.prisma.template.findFirst({
      where: {
        AND: [
          {
            id,
          },
          {
            userId,
          },
        ],
      },
    });

    return template;
  }

  async deleteTemplateById(id: string, userId: string) {
    const template = await this.prisma.template.deleteMany({
      where: {
        AND: [
          {
            id,
          },
          {
            userId,
          },
        ],
      },
    });

    return template;
  }

  async uploadImage(templateId: string, file: Express.Multer.File) {
    return '';
  }
}
