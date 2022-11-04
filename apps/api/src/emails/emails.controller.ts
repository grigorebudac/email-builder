import { Controller, Post, Body } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { SendEmailDto } from './dto/send-email.dto';

@Controller('emails')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @Post('/send')
  create(@Body() sendEmailDto: SendEmailDto) {
    return this.emailsService.send(sendEmailDto);
  }
}
