import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { UserSetting } from './userSetting.entity';

@Entity({ name: 'user' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  user_id: string;

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
}
