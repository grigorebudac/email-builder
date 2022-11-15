import { GetUserId } from '@/auth/decorator';
import { JwtGuard } from '@/auth/guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateTemplateDTO } from './dto';
import { UpdateTemplateDTO } from './dto/updateTemplate.dto';
import { TemplateService } from './template.service';

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
  @Get('/:id/html')
  getTemplateHTMLById(@Param('id') id: string, @GetUserId() userId: string) {
    return this.templateService.getTemplateHTMLById(id, userId);
  }

  @Delete('/:id')
  deleteTemplateById(@Param('id') id: string, @GetUserId() userId: string) {
    return this.templateService.deleteTemplateById(id, userId);
  }
}
