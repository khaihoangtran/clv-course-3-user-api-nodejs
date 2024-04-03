import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserRole } from '../enums/user.roles';

@Entity({ name: 'user' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => ID)
  user_id: string;

  @Column({ type: 'varchar', length: 50 })
  @Field((type) => String)
  full_name: string;

  @Column({ type: 'varchar', length: 50 })
  @Field((type) => String)
  user_name: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  @Field((type) => String)
  email: string;

  @Column({ type: 'varchar' })
  @Field((type) => String)
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  @Field((type) => String)
  role: UserRole;

  @DeleteDateColumn({ type: 'timestamp' })
  @Field((type) => Date)
  deleted_at: Date;

  @CreateDateColumn({ type: 'timestamp' })
  @Field((type) => Date)
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Field((type) => Date)
  updated_at: Date;
}
