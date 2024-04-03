import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

// Create user update DTO using Partial Type extends CreateUserDto
@InputType()
export class SearchUserDto {
  @Field((type) => String, { nullable: true })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  full_name?: string;

  @Field((type) => String, { nullable: true })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  user_name?: string;

  @Field((type) => String, { nullable: true })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  email?: string;

  @Field((type) => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  limit?: number;

  @Field((type) => String, { nullable: true })
  @IsOptional()
  role: string;
}
