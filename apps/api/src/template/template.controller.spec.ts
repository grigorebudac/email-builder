import { PrismaService } from '@/prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { TemplateController } from './template.controller';
import { TemplateService } from './template.service';
import { ConfigService } from '@nestjs/config';
import { CreateTemplateDTO } from './dto';
import { Prisma, Template } from '@prisma/client';
import { randomUUID } from 'crypto';
import { UpdateTemplateDTO } from './dto/updateTemplate.dto';

const MOCK_TEMPLATE: Template = {
  title: 'Hello',
  subtitle: 'World',
  content: {},
  html: '',
  id: randomUUID(),
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: randomUUID(),
  previewImage: '',
};

describe('TemplateController', () => {
  let controller: TemplateController;
  let service: TemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [PrismaService, ConfigService, TemplateService],
      controllers: [TemplateController],
    }).compile();

    controller = module.get<TemplateController>(TemplateController);
    service = module.get<TemplateService>(TemplateService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create template', async () => {
    const payload: CreateTemplateDTO = {
      title: 'Hello',
      subtitle: 'World',
    };

    const response: Template = {
      ...MOCK_TEMPLATE,
      ...payload,
    };

    jest
      .spyOn(service, 'createTemplate')
      .mockImplementation(async () => response);

    expect(await controller.createTemplate(MOCK_TEMPLATE.userId, payload)).toBe(
      response
    );
  });

  it('should update template', async () => {
    const payload: UpdateTemplateDTO = {
      html: '<h1>Hello</h1>',
      content: {
        children: 'Hello',
      },
    };

    const response: Prisma.BatchPayload = {
      count: 1,
    };

    jest
      .spyOn(service, 'updateTemplate')
      .mockImplementation(async () => response);

    expect(
      await controller.updateTemplate(
        MOCK_TEMPLATE.id,
        MOCK_TEMPLATE.userId,
        payload
      )
    ).toBe(response);
  });

  it('should get all templates', async () => {
    jest
      .spyOn(service, 'getTemplates')
      .mockImplementation(async () => [MOCK_TEMPLATE]);

    expect(await controller.getTemplates(MOCK_TEMPLATE.userId)).toEqual([
      MOCK_TEMPLATE,
    ]);
  });

  it('should get templateById', async () => {
    jest
      .spyOn(service, 'getTemplateById')
      .mockImplementation(async () => MOCK_TEMPLATE);

    expect(
      await controller.getTemplateById(MOCK_TEMPLATE.id, MOCK_TEMPLATE.userId)
    ).toBe(MOCK_TEMPLATE);
  });

  it('should get template html by id', async () => {
    jest
      .spyOn(service, 'getTemplateHTMLById')
      .mockImplementation(async () => MOCK_TEMPLATE.html);

    expect(
      await controller.getTemplateHTMLById(
        MOCK_TEMPLATE.id,
        MOCK_TEMPLATE.userId
      )
    ).toBe(MOCK_TEMPLATE.html);
  });

  it('should delete template by id', async () => {
    const response: Prisma.BatchPayload = {
      count: 1,
    };

    jest
      .spyOn(service, 'deleteTemplateById')
      .mockImplementation(async () => response);

    expect(
      await controller.deleteTemplateById(
        MOCK_TEMPLATE.id,
        MOCK_TEMPLATE.userId
      )
    ).toBe(response);
  });

  it('should update template preview image', async () => {
    const response: Prisma.BatchPayload = {
      count: 1,
    };

    jest
      .spyOn(service, 'updateTemplatePreviewImage')
      .mockImplementation(async () => response);

    expect(
      await controller.updateTemplatePreviewImage(
        MOCK_TEMPLATE.id,
        MOCK_TEMPLATE.userId
      )
    ).toBe(response);
  });
});
