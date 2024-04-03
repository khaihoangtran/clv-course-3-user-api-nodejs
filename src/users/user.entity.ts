<<<<<<< HEAD
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { UserSetting } from './userSetting.entity';
=======
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}
>>>>>>> fe74392 (User APIs using Nestjs & Postgresql & TypeORM & Docker)

@Entity({ name: 'user' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  user_id: string;

<<<<<<< HEAD
  @Column()
  @Field()
  full_name: string;

  @Column()
  @Field()
  user_name: string;

  // @IsNotEmpty()
  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Field({ nullable: true })
  @OneToOne(() => UserSetting)
  received?: UserSetting;
=======
  @Column({ type: 'varchar', length: 50 })
  @Field()
  full_name: string;

  @Column({ type: 'varchar', length: 50 })
  @Field()
  user_name: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  @Field()
  email: string;

  @Column({ type: 'varchar' })
  @Field()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  @Field()
  role: UserRole;
>>>>>>> fe74392 (User APIs using Nestjs & Postgresql & TypeORM & Docker)
}
