import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTemplateDTO } from './dto';
import { TemplateService } from './template.service';

@Controller('templates')
export class TemplateController {
  constructor(private templateService: TemplateService) {}

  @Post('')
  createTemplate(@Body() dto: CreateTemplateDTO) {
    return this.templateService.createTemplate(dto);
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
