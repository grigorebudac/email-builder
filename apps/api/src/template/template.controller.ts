import { GetUserId } from '@/auth/decorator';
import { JwtGuard } from '@/auth/guard';
import { Multer } from 'multer';
import {
  Body,
  Controller,
  Delete,
  Get,
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

@UseGuards(JwtGuard)
@Controller('templates')
export class TemplateController {
  constructor(private templateService: TemplateService) {}

  @Post('')
  createTemplate(@GetUserId() userId: string, @Body() dto: CreateTemplateDTO) {
    return this.templateService.createTemplate(userId, dto);
  }

  @Patch('/:id')
  updateTemplate(
    @Param('id') id: string,
    @GetUserId() userId: string,
    @Body() dto: UpdateTemplateDTO
  ) {
    return this.templateService.updateTemplate(id, userId, dto);
  }

  @Get('')
  getTemplates(@GetUserId() userId: string) {
    return this.templateService.getTemplates(userId);
  }

  @Get('/:id')
  getTemplateById(@Param('id') id: string, @GetUserId() userId: string) {
    return this.templateService.getTemplateById(id, userId);
  }

  @Delete('/:id')
  deleteTemplateById(@Param('id') id: string, @GetUserId() userId: string) {
    return this.templateService.deleteTemplateById(id, userId);
  }

  @Post('/:id/upload-image')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @Param('id') templateId: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.templateService.uploadImage(templateId, file);
  }
}
