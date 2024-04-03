import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create.user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  // Get all users
  @Get()
  async findAll(): Promise<User[]> {
    return this.UsersService.findAll();
  }

  // Get user by Id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.UsersService.findOneById(id);
  }

  // Create user
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.UsersService.create(createUserDto);
  }

  // Update user
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() createUserDto: CreateUserDto,
  ): Promise<any> {
    return this.UsersService.update(id, createUserDto);
  }

  // Delete user
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.UsersService.delete(id);
  }
}
