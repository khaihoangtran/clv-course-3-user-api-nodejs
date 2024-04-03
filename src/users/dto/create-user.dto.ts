import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

// Create user input dto
@InputType()
export class CreateUserDto {
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
  password: string;
}
