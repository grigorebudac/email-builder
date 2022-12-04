import { Template } from '@prisma/client';
import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateTemplateDTO {
  @IsString()
  @IsNotEmpty()
  title: Template['title'];

  @IsString()
  @IsNotEmpty()
  subtitle: Template['subtitle'];

  @IsObject()
  @IsOptional()
  content?: Template['content'];

  @IsString()
  @IsOptional()
  html?: Template['html'];

  @IsString()
  @IsOptional()
  previewImage?: Template['previewImage'];
}
