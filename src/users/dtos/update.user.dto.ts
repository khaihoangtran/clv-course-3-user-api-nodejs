import { InputType, PartialType } from '@nestjs/graphql';
import { CreateUserDto } from './create.user.dto';

// Create user update DTO using Partial Type extends CreateUserDto
@InputType()
export class UpdateUserDto extends PartialType(CreateUserDto) {}
