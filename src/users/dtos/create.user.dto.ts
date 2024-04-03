import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

import { Transform } from 'class-transformer';

// Create user input dto
@InputType()
export class CreateUserDto {
  @Field()
  @Transform(({ value }) => value.trim())
  @MaxLength(50)
  @MinLength(5)
  full_name: string;

  @Field()
  @Transform(({ value }) => value.trim())
  @MaxLength(50)
  @MinLength(5)
  user_name: string;

  @Field()
  @IsEmail({}, { message: 'Email is invalid' })
  email: string;

  @Field()
  @Transform(({ value }) => value.trim())
  @MinLength(6)
  password: string;
}
