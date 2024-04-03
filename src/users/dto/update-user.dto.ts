import { Field, InputType } from '@nestjs/graphql';
<<<<<<< HEAD
import { IsEmail, IsOptional } from 'class-validator';
=======
import {
  IsEmail,
  IsOptional,
  MaxLength,
  MinLength,
  IsNotEmpty,
} from 'class-validator';
>>>>>>> fe74392 (User APIs using Nestjs & Postgresql & TypeORM & Docker)

// Create user input dto
@InputType()
export class UpdateUserDto {
<<<<<<< HEAD
  @IsOptional()
  @Field({ nullable: true })
  full_name?: string;

  @IsOptional()
  @Field({ nullable: true })
=======
  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(6)
  full_name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(6)
>>>>>>> fe74392 (User APIs using Nestjs & Postgresql & TypeORM & Docker)
  user_name?: string;

  @Field({ nullable: true })
  @IsOptional()
<<<<<<< HEAD
  @IsEmail()
  email?: string;

  @IsOptional()
  @Field({ nullable: true })
=======
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  @MinLength(6)
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(6)
>>>>>>> fe74392 (User APIs using Nestjs & Postgresql & TypeORM & Docker)
  password?: string;
}
