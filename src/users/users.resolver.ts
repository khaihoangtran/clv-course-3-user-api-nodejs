import { BadRequestException, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create.user.dto';
import { UpdateUserDto } from './dtos/update.user.dto';
import { SearchUserDto } from './dtos/search.user.dto';
import * as jwt from 'jsonwebtoken';
@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query((returns) => [User])
  findAllUsers(
    @Args('query', { nullable: true }) searchUserDto?: SearchUserDto,
  ): Promise<any> {
    return this.usersService.findAll(searchUserDto);
  }
  @Query((returns) => User)
  findUserById(@Args('user_id', ParseUUIDPipe) id: string): Promise<User> {
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
  deleteUser(@Args('user_id', ParseUUIDPipe) id: string): Promise<User> {
    return this.usersService.delete(id);
  }

  @ResolveField('password')
  getPassword(@Parent() user: User): string {
    throw new BadRequestException('Password cannot be queried');
  }
  @ResolveField('deleted_at')
  getDeletedAt(@Parent() user: User): string {
    throw new BadRequestException('Deleted_at cannot be queried');
  }
}
