import { Field, InputType } from '@nestjs/graphql';
<<<<<<< HEAD
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
=======
import { IsEmail, IsNotEmpty, IsEnum, MaxLength, MinLength } from 'class-validator';
>>>>>>> fe74392 (User APIs using Nestjs & Postgresql & TypeORM & Docker)

// Create user input dto
@InputType()
export class CreateUserDto {
<<<<<<< HEAD
  @IsNotEmpty()
  @Field()
  full_name: string;

  @IsNotEmpty()
  @Field()
  user_name: string;

  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string;

  @IsNotEmpty()
  @Field()
=======
  @Field()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(6)
  full_name: string;

  @Field()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(6)
  user_name: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(6)
  email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(6)
>>>>>>> fe74392 (User APIs using Nestjs & Postgresql & TypeORM & Docker)
  password: string;
}
