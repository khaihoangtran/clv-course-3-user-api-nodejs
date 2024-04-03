import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let services: UsersService;

  const mockId = '1eb2ae02-c4bf-4729-817d-03cc36940eb5';
  const mockUser: CreateUserDto = {
    full_name: 'Khai Hoang Tran',
    user_name: 'trankhaihoang',
    email: 'khaihoang.tran.clv@gmail.com',
    password: '$2b$10$shbaS70fiOlJinn6t5NdT.hBEnORKSKMZH8E30F7MIERFEW77/uyG',
  };

  const mockUsersService = {
    create: jest.fn().mockReturnValue(mockUser),
    findAll: jest.fn().mockReturnValue([mockUser]),
    findById: jest.fn().mockReturnValue(mockUser),
    update: jest.fn().mockReturnValue(mockUser),
    delete: jest.fn().mockReturnValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, UsersResolver],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
    services = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new user', async () => {
    const expectedOutput = await controller.create(mockUser);
    expect(services.create).toHaveBeenCalledTimes(1);
    expect(services.create).toHaveBeenCalledWith(mockUser);
    expect(expectedOutput).toEqual(mockUser);
  });

  it('should find all users', async () => {
    const expectedOutput = await controller.findAll();
    expect(services.findAll).toHaveBeenCalledTimes(1);
    expect(expectedOutput).toEqual([mockUser]);
  });

  // it('should find users by id', async () => {
  //   const expectedOutput = await controller.findOne(mockId);
  //   expect(services.findOneById).toHaveBeenCalledTimes(1);
  //   expect(services.findOneById).toHaveBeenCalledWith(mockId);
  //   expect(expectedOutput).toEqual(mockUser);
  // });

  it('should update user by id and payload', async () => {
    const expectedOutput = await controller.update(mockId, mockUser);
    expect(services.update).toHaveBeenCalledTimes(1);
    expect(services.update).toHaveBeenCalledWith(mockId, mockUser);
    expect(expectedOutput).toEqual(mockUser);
  });

  it('should delete user by id', async () => {
    const expectedOutput = await controller.delete(mockId);
    expect(services.delete).toHaveBeenCalledTimes(1);
    expect(services.delete).toHaveBeenCalledWith(mockId);
    expect(expectedOutput).toEqual(mockUser);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
