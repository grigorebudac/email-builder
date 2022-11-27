import { HttpException, Injectable } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';
import { SES } from 'aws-sdk';
import { createTransport } from 'nodemailer';
import { SentMessageInfo } from 'nodemailer/lib/ses-transport';

const FROM_ADDRESS = 'abostan.ir@gmail.com';

@Injectable()
export class EmailsService {
  async send(sendEmailDto: SendEmailDto) {
    try {
      const ses = new SES({
        apiVersion: '2010-12-01',
        region: 'eu-west-1',
      });

      const transporter = createTransport({
        SES: { ses },
      });

      const response = await transporter.sendMail({
        from: FROM_ADDRESS,
        to: sendEmailDto.toAddress,
        inReplyTo: FROM_ADDRESS,
        subject: sendEmailDto.subject,
        html: sendEmailDto.body.html,
        text: sendEmailDto.body.text,
      });

      return { messageId: response.messageId };
    } catch (error) {
      throw new HttpException(
        {
          status: error.$metadata.httpStatusCode,
          error: error.message,
        },
        error.$metadata.httpStatusCode
      );
    }
  }
}
