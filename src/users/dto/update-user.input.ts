import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha, IsEmail, IsNotEmpty } from 'class-validator';

// Create user input dto
@InputType()
export class CreateUserInput {
  @IsAlpha()
  @Field()
  full_name: string;

  @Field()
  user_name: string;

  @IsEmail()
  @Field()
  email: string;

  @Field()
  password: string;
}
