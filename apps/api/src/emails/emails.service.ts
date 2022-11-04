import { Injectable } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class EmailsService {
  send(sendEmailDto: SendEmailDto) {
    return sendEmailDto;
  }
}
