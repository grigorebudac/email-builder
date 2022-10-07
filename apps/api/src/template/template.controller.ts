import { GetUser } from '@/auth/decorator';
import { JwtGuard } from '@/auth/guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateTemplateDTO } from './dto';
import { UpdateTemplateDTO } from './dto/updateTemplate.dto';
import { TemplateService } from './template.service';

@UseGuards(JwtGuard)
@Controller('templates')
export class TemplateController {
  constructor(private templateService: TemplateService) {}

  @Post('')
  createTemplate(@GetUser() user: User, @Body() dto: CreateTemplateDTO) {
    return this.templateService.createTemplate(user.id, dto);
  }

  @Patch('/:id')
  updateTemplate(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body() dto: UpdateTemplateDTO
  ) {
    return this.templateService.updateTemplate(id, user.id, dto);
  }

  @Get('')
  getTemplates(@GetUser() user: User) {
    return this.templateService.getTemplates(user.id);
  }

  @Get('/:id')
  getTemplateById(@Param('id') id: string, @GetUser() user: User) {
    return this.templateService.getTemplateById(id, user.id);
  }
}
