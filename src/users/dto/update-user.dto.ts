import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional } from 'class-validator';

// Create user input dto
@InputType()
export class UpdateUserDto {
  @IsOptional()
  @Field({ nullable: true })
  full_name?: string;

  @IsOptional()
  @Field({ nullable: true })
  user_name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @Field({ nullable: true })
  password?: string;
}
