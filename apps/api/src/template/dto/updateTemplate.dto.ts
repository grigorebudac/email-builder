import { IsNotEmpty } from 'class-validator';

export class UpdateTemplateDTO {
  @IsNotEmpty()
  content: Record<string, string>;
}
