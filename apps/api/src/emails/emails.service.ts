import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';
import * as aws from '@aws-sdk/client-ses';
import { createTransport } from 'nodemailer';
import { SentMessageInfo } from 'nodemailer/lib/ses-transport';

const FROM_ADDRESS = 'abostan.ir@gmail.com';

@Injectable()
export class EmailsService {
  async send(sendEmailDto: SendEmailDto) {
    let response: SentMessageInfo | null = null;
    const testData = 'some,stuff,to,send';

    try {
      const ses = new aws.SES({
        apiVersion: '2010-12-01',
        region: 'eu-west-1',
      });

      const transporter = createTransport({
        SES: { ses, aws },
      });

      response = await transporter.sendMail({
        from: FROM_ADDRESS,
        to: sendEmailDto.toAddress,
        inReplyTo: FROM_ADDRESS,
        subject: sendEmailDto.subject,
        html: sendEmailDto.body.html,
        text: sendEmailDto.body.text,
        // https://nodemailer.com/message/attachments/
        attachments: [
          {
            filename: 'usefulData.csv',
            content: testData,
          },
        ],
        // TODO:
        // cc: null,
        // bcc: null,
        priority: 'high',
        // icalEvent: { }
      });
    } catch (error) {
      throw new HttpException(
        {
          status: error.$metadata.httpStatusCode,
          error: error.message,
        },
        error.$metadata.httpStatusCode
      );
    }

    return response.messageId;
  }
}
