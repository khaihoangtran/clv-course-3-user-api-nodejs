import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from '../users.resolver';
import { UsersService } from '../users.service';
import { HttpStatus } from '@nestjs/common';
import {
  mockId,
  mockUser,
  invalidEmail,
  mockUsersService,
  duplicateEmail,
  mockUpdateUser,
  mockUpdatedUser,
  mockIncorrectID,
  mockLongName,
} from '@root/src/__mock__/users';
import { SearchUserDto } from '@users/dtos/search.user.dto';

describe('User Resolver', () => {
  let resolver: UsersResolver;
  let services: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();
    resolver = module.get<UsersResolver>(UsersResolver);
    services = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
    expect(services).toBeDefined();
  });

  describe('Create new User', () => {
    it('Should create a new user', async () => {
      const expectedOutput = await resolver.createUser(mockUser);
      expect(services.create).toHaveBeenCalledTimes(1);
      expect(services.create).toHaveBeenCalledWith(mockUser);
      expect(expectedOutput).toEqual(mockUser);
    });
    it('Should throw bad request exception with password is not longer than or equal 6 characters', async () => {
      try {
        await resolver.createUser({ ...mockUser, password: '12345' });
      } catch (error) {
        expect(error.message).toEqual(
          'Password must be longer than or equal to 6 characters',
        );
        expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(error.name).toEqual('BadRequestException');
      }
    });
    it('Should throw conflict exception with exits email', async () => {
      try {
        await resolver.createUser({ ...mockUser, email: duplicateEmail });
      } catch (error: any) {
        expect(error.message).toEqual('User already exists');
        expect(error.status).toEqual(HttpStatus.CONFLICT);
        expect(error.name).toEqual('ConflictException');
      }
    });
    it('Should throw bad request exception with invalid email', async () => {
      try {
        await resolver.createUser({ ...mockUser, email: invalidEmail });
      } catch (error: any) {
        expect(error.message).toEqual('Email is invalid');
        expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(error.name).toEqual('BadRequestException');
      }
    });
    it('Should throw bad request exception with empty username', async () => {
      try {
        await resolver.createUser({ ...mockUser, user_name: '' });
      } catch (error) {
        expect(error.message).toEqual('User name should not be empty');
        expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(error.name).toEqual('BadRequestException');
      }
    });
    it('Should throw bad request exception with empty email', async () => {
      try {
        await resolver.createUser({ ...mockUser, email: '' });
      } catch (error) {
        expect(error.message).toEqual('Email should not be empty');
        expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(error.name).toEqual('BadRequestException');
      }
    });
    it('Should throw bad request exception with empty password', async () => {
      try {
        await resolver.createUser({ ...mockUser, password: '' });
      } catch (error) {
        expect(error.message).toEqual('Password should not be empty');
        expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(error.name).toEqual('BadRequestException');
      }
    });
    it('Should throw bad request exception with empty full name', async () => {
      try {
        await resolver.createUser({ ...mockUser, full_name: '' });
      } catch (error) {
        expect(error.message).toEqual('Full name should not be empty');
        expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(error.name).toEqual('BadRequestException');
      }
    });
  });

  describe('Query', () => {
    it('Should query all users', async () => {
      const expectedOutput = await resolver.findAllUsers();
      expect(services.findAll).toHaveBeenCalledTimes(1);
      expect(expectedOutput).toEqual([mockUser]);
    });

    it('Should query all users', async () => {
      const dto: SearchUserDto = {
        full_name: 'tran',
        role: 'user',
      };
      const expectedOutput = await resolver.findAllUsers(dto);
      expect(services.findAll).toHaveBeenCalledTimes(1);
      expect(services.findAll).toHaveBeenCalledWith(dto);
      expect(expectedOutput).toEqual([mockUser]);
    });

    it('Should query user by id', async () => {
      const expectedOutput = await resolver.findUserById(mockId);
      expect(services.findOneById).toHaveBeenCalledTimes(1);
      expect(services.findOneById).toHaveBeenCalledWith(mockId);
      expect(expectedOutput).toEqual(mockUser);
    });
  });

  describe('Update user', () => {
    it('Should update user by id', async () => {
      const expectedOutput = await resolver.updateUser(mockUpdateUser, mockId);
      expect(services.update).toHaveBeenCalledTimes(1);
      expect(services.update).toHaveBeenCalledWith(mockId, mockUpdateUser);
      expect(expectedOutput).toEqual(mockUpdatedUser);
    });
    it('Should throw not found exception with incorrect user id', async () => {
      try {
        await resolver.updateUser(mockUpdateUser, mockIncorrectID);
      } catch (error: any) {
        expect(error.message).toEqual('User dose not exits');
        expect(error.status).toEqual(HttpStatus.NOT_FOUND);
        expect(error.name).toEqual('NotFoundException');
      }
    });
    it('Should throw bad request exception with empty user id', async () => {
      try {
        await resolver.updateUser(mockUpdateUser, '');
      } catch (error: any) {
        expect(error.message).toEqual('User id should not be empty');
        expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(error.name).toEqual('BadRequestException');
      }
    });
    it('Should throw bad request exception with empty email', async () => {
      try {
        await resolver.updateUser({ ...mockUpdateUser, email: '' }, mockId);
      } catch (error: any) {
        expect(error.message).toEqual('Email should not be empty');
        expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(error.name).toEqual('BadRequestException');
      }
    });
    it('Should throw bad request exception with invalid email', async () => {
      try {
        await resolver.updateUser(
          { ...mockUpdateUser, email: invalidEmail },
          mockId,
        );
      } catch (error: any) {
        expect(error.message).toEqual('Email is invalid');
        expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(error.name).toEqual('BadRequestException');
      }
    });
    it('Should throw bad request exception with empty full name', async () => {
      try {
        await resolver.updateUser({ ...mockUpdateUser, full_name: '' }, mockId);
      } catch (error: any) {
        expect(error.message).toEqual('Full name should not be empty');
        expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(error.name).toEqual('BadRequestException');
      }
    });
    it('Should throw bad request exception with full name is shorter than 6 characters', async () => {
      try {
        await resolver.updateUser(
          { ...mockUpdateUser, full_name: 'hello' },
          mockId,
        );
      } catch (error: any) {
        expect(error.message).toEqual(
          'Full name must be longer than or equal to 6 characters',
        );
        expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(error.name).toEqual('BadRequestException');
      }
    });
    it('Should throw bad request exception with full name is longer than 50 characters', async () => {
      try {
        await resolver.updateUser(
          { ...mockUpdateUser, full_name: mockLongName },
          mockId,
        );
      } catch (error: any) {
        expect(error.message).toEqual(
          'Full name must be shorter than or equal to 50 characters',
        );
        expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(error.name).toEqual('BadRequestException');
      }
    });
    it('Should throw bad request exception with empty user name', async () => {
      try {
        await resolver.updateUser({ ...mockUpdateUser, user_name: '' }, mockId);
      } catch (error: any) {
        expect(error.message).toEqual('User name should not be empty');
        expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(error.name).toEqual('BadRequestException');
      }
    });
    it('Should throw bad request exception with user name is shorter than 6 characters', async () => {
      try {
        await resolver.updateUser(
          { ...mockUpdateUser, user_name: 'hello' },
          mockId,
        );
      } catch (error: any) {
        expect(error.message).toEqual(
          'User name must be longer than or equal to 6 characters',
        );
        expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(error.name).toEqual('BadRequestException');
      }
    });
    it('Should throw bad request exception with empty password', async () => {
      try {
        await resolver.updateUser({ ...mockUpdateUser, password: '' }, mockId);
      } catch (error: any) {
        expect(error.message).toEqual('Password should not be empty');
        expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(error.name).toEqual('BadRequestException');
      }
    });
    it('Should throw bad request exception with password is shorter than 6 characters', async () => {
      try {
        await resolver.updateUser(
          { ...mockUpdateUser, password: 'hello' },
          mockId,
        );
      } catch (error: any) {
        expect(error.message).toEqual(
          'Password must be longer than or equal to 6 characters',
        );
        expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(error.name).toEqual('BadRequestException');
      }
    });
  });
  describe('Delete user', () => {
    it('Should delete user by id', async () => {
      const expectedOutput = await resolver.deleteUser(mockId);
      expect(services.delete).toHaveBeenCalledTimes(1);
      expect(services.delete).toHaveBeenCalledWith(mockId);
      expect(expectedOutput).toEqual(mockUser);
    });

    it('Should throw not found exception with incorrect user id', async () => {
      try {
        await resolver.deleteUser(mockIncorrectID);
      } catch (error: any) {
        expect(error.message).toEqual('User dose not exits');
        expect(error.status).toEqual(HttpStatus.NOT_FOUND);
        expect(error.name).toEqual('NotFoundException');
      }
    });
  });
});
