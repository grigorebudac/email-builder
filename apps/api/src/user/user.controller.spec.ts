import { PrismaService } from '@/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { randomUUID } from 'crypto';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const MOCK_USER: User = {
  id: randomUUID(),
  email: 'hello@world.com',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [PrismaService, ConfigService, UserService],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get me', async () => {
    jest.spyOn(service, 'getMe').mockImplementation(async () => MOCK_USER);

    expect(await controller.getMe(MOCK_USER.id)).toBe(MOCK_USER);
  });
});
