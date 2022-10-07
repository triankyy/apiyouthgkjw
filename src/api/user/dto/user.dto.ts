import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IsExist } from '../../../validators/exist.validator';
import { IsUnique } from '../../../validators/unique.validator';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';
import { Wilayah } from '../entities/wilayah.entity';

export class UserDto {
  // @ApiProperty()
  @IsOptional()
  @IsExist([User, 'id'])
  id?: number;

  @ApiProperty({ default: 'Your name', required: true })
  @IsString()
  name: string;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Role)
  roles: Role[];

  @ApiProperty()
  @IsObject()
  @Type(() => Wilayah)
  wilayah!: Wilayah;

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

export class UpdateUserDto extends OmitType(UserDto, ['roles', 'wilayah']) {
  @IsArray()
  roles: number[];
  
  @IsNumber()
  wilayah!: number;
}

export class CreateUserDto extends OmitType(UpdateUserDto, ['id']) {
  @IsArray()
  roles: number[];

  @IsNumber()
  wilayah!: number;
}

export class UserIdDto {
  @ApiProperty()
  @IsOptional()
  @IsExist([User, 'id'])
  id?: number;
}
