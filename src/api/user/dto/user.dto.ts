import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IsExist } from '../../../validators/exist.validator';
import { IsUnique } from '../../../validators/unique.validator';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';

export class UserDto {
  // @ApiProperty()
  @IsOptional()
  @IsExist([User, 'id'])
  id?: number;

  @ApiProperty({ default: 'Your name', required: true })
  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Role)
  roles: Role[];

  @ApiProperty()
  @IsUnique([User, 'email'])
  @IsOptional()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  password!: string;
}

//OmitType = delete salah satu dari dto
//PickType = sebaliknya dari OmitType
export class CreateUserDto extends OmitType(UserDto, ['id', 'roles']) {
  @IsArray()
  roles: number[];
}

export class UpdateUserDto extends OmitType(UserDto, ['roles']) {
  @IsArray()
  roles: number[];
}

export class UserIdDto {
  @ApiProperty()
  @IsOptional()
  @IsExist([User, 'id'])
  id?: number;
}
