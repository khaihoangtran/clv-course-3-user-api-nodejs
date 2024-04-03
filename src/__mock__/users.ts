import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dtos/create.user.dto';
import { Repository } from 'typeorm';
import { UpdateUserDto } from 'src/users/dtos/update.user.dto';
import { SearchUserDto } from '@users/dtos/search.user.dto';

export const mockId = '1eb2ae02-c4bf-4729-817d-03cc36940eb5';
export const mockIncorrectID = '1eb2ae02-c4bf-4729-817d-03cc3694fdsa';
export const mockLongName =
  '$2a$10$iY2PKBx8AnKLZPCIQjLg1uh39iWNKHtp8CT59J4MZ1rGsA5oZX2EK$2a$10$iY2PKBx8AnKLZPCIQjLg1uh39iWNKHtp8CT59J4MZ1rGsA5oZX2EK$2a$10$iY2PKBx8AnKLZPCIQjLg1uh39iWNKHtp8CT59J4MZ1rGsA5oZX2EK';
export const invalidEmail = 'khaihoang.tran.clvgmail.com';
export const duplicateEmail = 'khaihoang.tran.clv1@gmail.com';

export const mockUser: CreateUserDto = {
  full_name: 'Khai Hoang Tran',
  user_name: 'trankhaihoang',
  email: 'khaihoang.tran.clv@gmail.com',
  password: '$2a$10$iY2PKBx8AnKLZPCIQ',
};

export const mockUpdateUser: UpdateUserDto = {
  full_name: 'Khai Hoang Tran 1',
  user_name: 'trankhaihoang 1',
};

export const mockUpdatedUser = {
  full_name: 'Khai Hoang Tran',
  user_name: 'trankhaihoang',
  email: 'khaihoang.tran.clv@gmail.com',
  password: '$2a$10$iY2PKBx8AnKLZPCIQ',
};

export const mockUsersService = {
  create: jest.fn().mockImplementation((user: CreateUserDto) => {
    try {
      validateCreateUser(user);
      return mockUser;
    } catch (error: any) {
      throw error;
    }
  }),
  findAll: jest.fn().mockImplementation((dto: SearchUserDto) => {
    return [mockUser];
  }),
  findOneById: jest.fn().mockImplementation((user_id: string) => {
    if (!user_id) throw new BadRequestException('User id should not be empty');
    else if (user_id === mockIncorrectID)
      throw new NotFoundException('User dose not exits');
    return mockUser;
  }),
  update: jest
    .fn()
    .mockImplementation((user_id: string, user: UpdateUserDto) => {
      if (!user_id)
        throw new BadRequestException('User id should not be empty');
      else if (user_id === mockIncorrectID)
        throw new NotFoundException('User dose not exits');

      if (user.email != null) {
        if (user.email === invalidEmail)
          throw new BadRequestException('Email is invalid');
        if (user.email === '')
          throw new BadRequestException('Email should not be empty');
      }
      if (user.full_name != null) {
        if (user.full_name === '')
          throw new BadRequestException('Full name should not be empty');
        if (user.full_name.length < 6)
          throw new BadRequestException(
            'Full name must be longer than or equal to 6 characters',
          );
        if (user.full_name.length > 50) {
          throw new BadRequestException(
            'Full name must be shorter than or equal to 50 characters',
          );
        }
      }
      if (user.user_name != null) {
        if (user.user_name === '')
          throw new BadRequestException('User name should not be empty');
        if (user.user_name.length < 6)
          throw new BadRequestException(
            'User name must be longer than or equal to 6 characters',
          );
        if (user.user_name.length > 50) {
          throw new BadRequestException(
            'User name must be shorter than or equal to 50 characters',
          );
        }
      }
      if (user.password != null) {
        if (user.password === '')
          throw new BadRequestException('Password should not be empty');
        if (user.password.length < 6)
          throw new BadRequestException(
            'Password must be longer than or equal to 6 characters',
          );
        if (user.password.length > 50) {
          throw new BadRequestException(
            'Password must be shorter than or equal to 50 characters',
          );
        }
      }

      return mockUpdatedUser;
    }),
  delete: jest.fn().mockImplementation((user_id: string) => {
    if (!user_id) throw new BadRequestException('User id should not be empty');
    else if (user_id === mockIncorrectID)
      throw new NotFoundException('User dose not exits');
    return mockUser;
  }),
};

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    save: jest.fn((entity) => entity),
    update: jest.fn((entity) => entity),
    find: jest.fn((entity) => entity),
    findOne: jest.fn((entity) => entity),
    delete: jest.fn((entity) => entity),
  }),
);

const validateCreateUser = (user: CreateUserDto) => {
  if (!user.email || !user.full_name || !user.password || !user.user_name) {
    if (!user.email) {
      throw new BadRequestException('Email should not be empty');
    } else if (!user.full_name) {
      throw new BadRequestException('Full name should not be empty');
    } else if (!user.password) {
      throw new BadRequestException('Password should not be empty');
    } else {
      throw new BadRequestException('User name should not be empty');
    }
  } else {
    if (user.email === invalidEmail) {
      throw new BadRequestException('Email is invalid');
    } else if (user.email === duplicateEmail) {
      throw new ConflictException('User already exists');
    }
    if (user.password.length < 6) {
      throw new BadRequestException(
        'Password must be longer than or equal to 6 characters',
      );
    }
  }
};
