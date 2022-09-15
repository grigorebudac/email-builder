import { Module } from '@nestjs/common';
import { TemplateController } from './template.controller';
import { TemplateService } from './template.service';

@Module({
  imports: [],
  controllers: [TemplateController],
  providers: [TemplateService],
})
export class TemplateModule {}
