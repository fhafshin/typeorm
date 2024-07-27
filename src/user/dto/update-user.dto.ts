import { UserCreateDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';
export class UserUpdateDto extends PartialType(UserCreateDto) {}
