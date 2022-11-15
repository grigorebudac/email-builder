import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTemplateDTO {
  @IsNotEmpty()
  content: Record<string, string>;

  @IsString()
  @IsNotEmpty()
  html: string;
}
