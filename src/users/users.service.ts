import { SearchUserDto } from './dtos/search.user.dto';
import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create.user.dto';
import { UpdateUserDto } from './dtos/update.user.dto';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserRole } from './enums/user.roles';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async hashPassword(password: string): Promise<any> {
    try {
      return await bcrypt.hash(password, 10);
    } catch (error) {
      throw new InternalServerErrorException("Can't hashed password");
    }
  }

  // Create new user service
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check email is existed
    const existedUser = await this.findByEmail(createUserDto.email);
    if (existedUser) throw new ConflictException('User already exists');
    const password = await this.hashPassword(createUserDto.password);
    try {
      return await this.userRepository.save({
        ...createUserDto,
        password,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        "Can't save user, [ERROR]: ",
        error,
      );
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOne({ where: { email: email } });
    } catch (error) {
      throw new InternalServerErrorException(
        "Can't find users, [ERROR]: ",
        error,
      );
    }
  }

  // Find all users service
  async findAll(searchUserDto?: SearchUserDto): Promise<any> {
    if (!searchUserDto) {
      return await this.userRepository.find();
    }
    const full_name = searchUserDto.full_name ?? '';
    const user_name = searchUserDto.user_name ?? '';
    const email = searchUserDto.email ?? '';
    const userRole = searchUserDto.role ?? null;
    const limit = searchUserDto.limit ?? null;

    try {
      const users = await this.userRepository.find({
        where: {
          user_name: ILike(`%${user_name}%`),
          full_name: ILike(`%${full_name}%`),
          email: ILike(`%${email}%`),
          role: !userRole
            ? In([UserRole.ADMIN, UserRole.USER])
            : UserRole.ADMIN.includes(userRole.toLowerCase())
              ? UserRole.ADMIN
              : UserRole.USER.includes(userRole.toLowerCase())
                ? UserRole.USER
                : In([UserRole['notFound']]),
        },
        take: limit,
      });
      if (users.length === 0) throw new NotFoundException('Users not found');
      return users;
    } catch (error) {
      throw error;
    }
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

  // Update user service
  async update(user_id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { user_id: user_id },
    });
    if (!user) {
      throw new NotFoundException('User dose not exits!');
    }
    if (updateUserDto.password) {
      const password = await this.hashPassword(updateUserDto.password);
      updateUserDto = { ...updateUserDto, password };
    }
    try {
      await this.userRepository.update(user_id, updateUserDto);
      return this.userRepository.findOne({ where: { user_id } });
    } catch (error) {
      throw new InternalServerErrorException(
        "Can't update user, [ERROR]: ",
        error,
      );
    }
  }

  // Delete user service
  async delete(user_id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ user_id });
    if (!user) {
      throw new NotFoundException('User dose not exits!');
    }
    try {
      await this.userRepository.softDelete(user_id);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // 
}
