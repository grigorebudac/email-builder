import { GetUserId } from '@/auth/decorator';
import { JwtGuard } from '@/auth/guard';
import { Multer } from 'multer';
import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateTemplateDTO } from './dto';
import { UpdateTemplateDTO } from './dto/updateTemplate.dto';
import { TemplateService } from './template.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('templates')
export class TemplateController {
  constructor(private templateService: TemplateService) {}

  @Post('')
  @UseGuards(JwtGuard)
  createTemplate(@GetUserId() userId: string, @Body() dto: CreateTemplateDTO) {
    return this.templateService.createTemplate(userId, dto);
  }

  @Patch('/:id')
  @UseGuards(JwtGuard)
  updateTemplate(
    @Param('id') id: string,
    @GetUserId() userId: string,
    @Body() dto: UpdateTemplateDTO
  ) {
    return this.templateService.updateTemplate(id, userId, dto);
  }

  @Get('')
  @UseGuards(JwtGuard)
  getTemplates(@GetUserId() userId: string) {
    return this.templateService.getTemplates(userId);
  }

  @Get('/:id')
  @UseGuards(JwtGuard)
  getTemplateById(@Param('id') id: string, @GetUserId() userId: string) {
    return this.templateService.getTemplateById(id, userId);
  }

  @Post('/:id/html')
  getTemplateHTMLById(
    @Param('id') id: string,
    @Body() mergeTags: Record<string, string>
  ) {
    return this.templateService.getTemplateHTMLById(id, mergeTags);
  }

  @Delete('/:id')
  @UseGuards(JwtGuard)
  deleteTemplateById(@Param('id') id: string, @GetUserId() userId: string) {
    return this.templateService.deleteTemplateById(id, userId);
  }

  @Post('/:id/upload-image')
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @Param('id') templateId: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.templateService.uploadImage(templateId, file);
  }

  @Patch('/:id/preview-image')
  @UseGuards(JwtGuard)
  updateTemplatePreviewImage(
    @Param('id') templateId: string,
    @GetUserId() userId: string
  ) {
    return this.templateService.updateTemplatePreviewImage(templateId, userId);
  }
}
