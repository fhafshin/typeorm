import { Optional } from '@nestjs/common';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @Optional()
  bio: string;
  @IsString()
  @Optional()
  photo: string;
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
