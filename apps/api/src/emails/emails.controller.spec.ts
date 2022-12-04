import { Test, TestingModule } from '@nestjs/testing';
import { SendEmailDto } from './dto/send-email.dto';
import { EmailsController } from './emails.controller';
import { EmailsService } from './emails.service';

describe('EmailsController', () => {
  let controller: EmailsController;
  let service: EmailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailsController],
      providers: [EmailsService],
    }).compile();

    controller = module.get<EmailsController>(EmailsController);
    service = module.get<EmailsService>(EmailsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should send email', async () => {
    const response = {
      messageId: '123',
    };

    const payload: SendEmailDto = {
      subject: 'Hello World',
      body: {
        html: '<div></div>',
        text: 'It works',
      },
      toAddress: 'my@email.com',
    };

    jest.spyOn(service, 'send').mockImplementation(async () => response);

    expect(await controller.send(payload)).toBe(response);
  });
});
