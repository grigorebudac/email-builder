import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class EmailBodyDto {
  @IsNotEmpty()
  @IsString()
  @Matches('^')
  html: string;

  @IsNotEmpty()
  @IsString()
  text: string;
}

export class SendEmailDto {
  @IsEmail()
  @IsNotEmpty()
  toAddress: string;

  @IsAlphanumeric()
  @IsNotEmpty()
  subject: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => EmailBodyDto)
  body: EmailBodyDto;
}
