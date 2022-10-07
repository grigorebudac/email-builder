import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTemplateDTO } from './dto';
import { UpdateTemplateDTO } from './dto/updateTemplate.dto';
import { TemplateService } from './template.service';

@Controller('templates')
export class TemplateController {
  constructor(private templateService: TemplateService) {}

  @Post('')
  createTemplate(@Body() dto: CreateTemplateDTO) {
    return this.templateService.createTemplate(dto);
  }

  @Patch('/:id')
  updateTemplate(@Param('id') id: string, @Body() dto: UpdateTemplateDTO) {
    return this.templateService.updateTemplate(id, dto);
  }

  @Get('')
  getTemplates() {
    return this.templateService.getTemplates();
  }

  @Get('/:id')
  getTemplateById(@Param('id') id: string) {
    return this.templateService.getTemplateById(id);
  }
}
