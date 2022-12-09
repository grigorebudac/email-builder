import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendEmailDto } from './dto/send-email.dto';
import { SES } from 'aws-sdk';

const FROM_ADDRESS = 'abostan.ir@gmail.com';

@Injectable()
export class EmailsService {
  ses: SES;

  constructor(private config: ConfigService) {
    this.ses = new SES({
      apiVersion: '2010-12-01',
      region: 'us-east-1',
      accessKeyId: this.config.get('AWS_S3_ACCESS_KEY'),
      secretAccessKey: this.config.get('AWS_S3_KEY_SECRET'),
    });
  }

  async send(sendEmailDto: SendEmailDto) {
    try {
      const params: SES.SendEmailRequest = {
        Destination: {
          ToAddresses: [sendEmailDto.toAddress],
        },
        Message: {
          Body: {
            Text: {
              Charset: 'UTF-8',
              Data: sendEmailDto.body.text,
            },
            Html: {
              Charset: 'UTF-8',
              Data: sendEmailDto.body.html,
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: sendEmailDto.subject,
          },
        },
        Source: FROM_ADDRESS,
      };

      const result = await this.ses.sendEmail(params).promise();

      return { messageId: result.MessageId };
    } catch (error) {
      throw new HttpException(
        {
          status: error.statusCode,
          error: error.message,
        },
        error.statusCode
      );
    }
  }
}
