import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha, IsEmail, IsNotEmpty } from 'class-validator';

// Create user input dto
@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @IsAlpha()
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
