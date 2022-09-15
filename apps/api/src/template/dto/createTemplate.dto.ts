import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTemplateDTO {
  @IsString()
  @IsNotEmpty()
  title: string;
}
