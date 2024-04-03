import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import {
  MockType,
  repositoryMockFactory,
  mockUser,
  mockId,
  invalidEmail,
} from '@root/src/__mock__/users';
import { Repository } from 'typeorm';
import { HttpStatus } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let repositoryMock: MockType<Repository<User>>;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repositoryMock = await module.get(USER_REPOSITORY_TOKEN);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repositoryMock).toBeDefined();
  });

  describe('Create User', () => {
    it('Should create a new user', async () => {
      repositoryMock.save.mockReturnValue(mockUser);
      repositoryMock.findOne.mockReturnValue(null);
      expect(repositoryMock.save).not.toHaveBeenCalled();
      const expectedOutput = await service.create(mockUser);
      expect(repositoryMock.save).toHaveBeenCalledTimes(1);
      expect(expectedOutput).toEqual(mockUser);
    });

    it('Should throw bad request exception with password is not longer than or equal 6 characters', async () => {
      try {
        repositoryMock.save({ ...mockUser, password: '12345' });
        repositoryMock.findOne.mockReturnValue(null);
      } catch (error) {
        expect(error.message).toEqual(
          'Password must be longer than or equal to 6 characters',
        );
        expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(error.name).toEqual('BadRequestException');
      }
    });

    it('Should throw conflict exception with duplicate email', async () => {
      repositoryMock.save.mockReturnValue(mockUser);
      try {
        await service.create(mockUser);
      } catch (error: any) {
        expect(error.message).toEqual('User already exists');
        expect(error.status).toEqual(HttpStatus.CONFLICT);
        expect(error.name).toEqual('ConflictException');
      }
    });
  });

  describe('Get Users', () => {
    it('Should return all users', async () => {
      repositoryMock.find.mockImplementation(() => {
        return [mockUser];
      })
      expect(repositoryMock.find).not.toHaveBeenCalled();
      const expectedOutput = await service.findAll();
      expect(repositoryMock.find).toHaveBeenCalled();
      expect(expectedOutput).toEqual([mockUser]);
    });

    it('Should return user by id', async () => {
      repositoryMock.find.mockReturnValue(mockId);
      expect(repositoryMock.findOne).not.toHaveBeenCalled();
      const expectedOutput = await service.findOneById(mockId);
      expect(repositoryMock.findOne).toHaveBeenCalled();
      expect(expectedOutput).toEqual({ where: { user_id: mockId } });
    });
  });
  describe('Update User', () => {
    it('should update a user by id', async () => {
      repositoryMock.update.mockReturnValue(mockUser);
      expect(repositoryMock.update).not.toHaveBeenCalled();
      const expectedOutput = await service.update(mockId, mockUser);
      expect(expectedOutput).toEqual({ where: { user_id: mockId } });
    });
  });
});
