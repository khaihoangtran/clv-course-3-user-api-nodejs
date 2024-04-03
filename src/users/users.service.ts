import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';

const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Find all users service
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Find one user service
  async findOne(query: object): Promise<User> {
    return this.userRepository.findOne({ where: query });
  }

  // Find one user by id service
  async findOneById(user_id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { user_id: user_id },
    });
    if (!user) {
      throw new NotFoundException('User dose not exits!');
    }
    return user;
  }

  // Create new user service
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check email is existed
    const existedUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existedUser !== null)
      throw new ConflictException('User already exists');

    // Hashing password
    const password = await hashPassword(createUserDto.password);
    return this.userRepository.save({
      ...createUserDto,
      password,
    });
  }

  // Update user service
  async update(user_id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      const password = await hashPassword(updateUserDto.password);
      updateUserDto = { ...updateUserDto, password };
    }
    await this.userRepository.update(user_id, updateUserDto);
    return this.userRepository.findOne({ where: { user_id } });
  }

  // Delete user service
  async delete(user_id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ user_id });
    if (!user) {
      throw new NotFoundException('User dose not exits!');
    }
    await this.userRepository.delete(user_id);
    return user;
  }
}
