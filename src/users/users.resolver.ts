import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query((returns) => [User])
  async users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query((returns) => User)
  async findUserById(@Args('user_id') id: string): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @Mutation((returns) => User)
  createUser(
    @Args('createUserDto') createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Mutation((returns) => User)
  updateUser(
    @Args('updateUserDto') updateUserDto: UpdateUserDto,
    @Args('id') id: string,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Mutation((returns) => User)
  deleteUser(@Args('user_id') id: string): Promise<User> {
    return this.usersService.delete(id);
  }
}
