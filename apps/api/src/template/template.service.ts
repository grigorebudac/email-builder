import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { randomUUID } from 'crypto';

import { PrismaService } from '@/prisma/prisma.service';
import { CreateTemplateDTO } from './dto';
import { UpdateTemplateDTO } from './dto/updateTemplate.dto';

const nodeHtmlToImage = require('node-html-to-image');

@Injectable()
export class TemplateService {
  s3: S3;

  constructor(private prisma: PrismaService, private config: ConfigService) {
    this.s3 = new S3({
      accessKeyId: this.config.get('AWS_S3_ACCESS_KEY'),
      secretAccessKey: this.config.get('AWS_S3_KEY_SECRET'),
    });
  }

  async createTemplate(userId: string, dto: CreateTemplateDTO) {
    const template = await this.prisma.template.create({
      data: {
        title: dto.title,
        subtitle: dto.subtitle,
        content: {},
        html: '',
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
        html: dto.html,
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

  async getTemplateHTMLById(id: string, userId: string) {
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

    return template.html;
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
    const extension = file.mimetype.split('/')[1];
    const filename = `${randomUUID()}.${extension}`;

    const result = await this.s3
      .upload({
        Bucket: this.config.get('TEMPLATE_IMAGES_S3_BUCKET'),
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
        Key: `${templateId}/${filename}`,
      })
      .promise();

    return { location: result.Location };
  }

  async updateTemplatePreviewImage(id: string, userId: string) {
    const template = await this.getTemplateById(id, userId);

    if (!template.html) return {};

    const image = await nodeHtmlToImage({
      html: template.html,
    });

    const result = await this.s3
      .upload({
        Bucket: this.config.get('TEMPLATE_IMAGES_S3_BUCKET'),
        Body: image,
        ContentType: image.mimetype,
        ACL: 'public-read',
        Key: `${id}/preview.png`,
      })
      .promise();

    const updatedTemplate = await this.prisma.template.updateMany({
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
        previewImage: result.Location,
      },
    });

    return updatedTemplate;
  }
}
