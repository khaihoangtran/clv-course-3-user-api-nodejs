import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { UsersResolver } from '../users.resolver';
import { mockId, mockUser, mockUsersService } from '@root/src/__mock__/users';
describe('UsersController', () => {
  let controller: UsersController;
  let services: UsersService;

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

  it('should find user by id', async () => {
    const expectedOutput = await controller.findOne(mockId);
    expect(services.findOneById).toHaveBeenCalledTimes(1);
    expect(services.findOneById).toHaveBeenCalledWith(mockId);
    expect(expectedOutput).toEqual(mockUser);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
