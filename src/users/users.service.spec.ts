import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { HttpStatus, NotFoundException } from '@nestjs/common';

const mockUser = {
  full_name: 'Khai Hoang Tran',
  user_name: 'trankhaihoang',
  email: 'khaihoang.tran.clv100@gmail.com',
  password: 'hello',
  user_id: '1eb2ae02-c4bf-4729-817d-03cc36940eb5',
} as User;

const mockInvalidEmailUser = {
  full_name: 'Invalid Email',
  user_name: 'invalid',
  email: 'invalidgmail.com',
  password: 'hello',
} as User;

const mockAllUsers = {
  data: [
    {
      user_id: '1eb2ae02-c4bf-4729-817d-03cc36940eb5',
      full_name: 'Khai Hoang Tran',
      user_name: 'trankhaihoang',
      email: 'khaihoang.tran.clv@gmail.com',
      password: '$2b$10$shbaS70fiOlJinn6t5NdT.hBEnORKSKMZH8E30F7MIERFEW77/uyG',
    },
    {
      user_id: '2901ef96-612d-45fb-aaca-b8951cadafd4',
      full_name: 'Khai Hoang Tran1',
      user_name: 'trankhaihoang1',
      email: 'khaihoang.tran.clv1@gmail.com',
      password: '$2b$10$n5xYVFnm4UkTfJ8KW3PG1..NvND7fDZOXcQT7uZQZIIgiGTKbrNlW',
    },
    {
      user_id: '0efbb5eb-833a-4f5d-bdbb-89a5f259054b',
      full_name: 'Nguyen Tan Phat',
      user_name: 'nguyentanphat',
      email: 'ntpgmail.com',
      password: '$2b$10$TzjB..m1C2NHHOTwGpU4COuywSRiCgpoH4VtRZCqbB.6RtdhB/epa',
    },
    {
      user_id: 'bdc15c3c-001f-4001-80ee-77e607af0fd1',
      full_name: 'Tran Thi Gia Han',
      user_name: 'hantran',
      email: 'hantran@gmail.com',
      password: '$2b$10$/jHq2A/ftzovNyuF.sZaNOzO70gHso6ed4dp0iLz6mxlEnU/Os2He',
    },
  ],
};
const mockId = '1eb2ae02-c4bf-4729-817d-03cc36940eb5';
const mockIdError = 'error';

class MockedOrderModel {
  constructor(private _: any) {}
  new = jest.fn().mockReturnValue({});
  static save = jest.fn().mockResolvedValue(mockUser);
  static find = jest.fn().mockReturnThis();
  static create = jest.fn().mockReturnValue(mockUser);
  static delete = jest.fn().mockImplementation((id: string) => {
    if (id == mockId) throw new NotFoundException();
    return this;
  });
  static exec = jest.fn().mockReturnValue(mockUser);
  static select = jest.fn().mockReturnThis();
  static findOne = jest.fn().mockImplementation((id: string) => {
    if (id == mockIdError) throw new NotFoundException();
    return this;
  });
}

describe('UsersService', () => {
  let service: UsersService;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: MockedOrderModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('should create new user', () => {
  //   it('should throw ConflictException', async () => {
  //     try {
  //       await service.create(mockUser);
  //     } catch (error: any) {
  //       expect(error.status).toEqual(HttpStatus.CONFLICT);
  //       expect(error.name).toEqual('ConflictException');
  //     }
  //   });
  //   it('should throw BadRequest', async () => {
  //     try {
  //       await service.create(mockInvalidEmailUser);
  //     } catch (error: any) {
  //       expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
  //       expect(error.name).toEqual('BadRequestException');
  //     }
  //   });
  // });

  describe('Get Order', () => {
    

    it('should throw NotFoundException', async () => {
      try {
        await service.findOneById(mockIdError);
      } catch (error: any) {
        expect(error.message).toEqual('Not Found');
        expect(error.status).toEqual(HttpStatus.NOT_FOUND);
        expect(error.name).toEqual('NotFoundException');
      }
    });
    it('should throw 200', async () => {
      try {
        await service.findOneById(mockId);
      } catch (error: any) {
        expect(error.status).toEqual(HttpStatus.OK);
      }
    });
  });
});
