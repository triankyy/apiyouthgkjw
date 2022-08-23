import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsExist } from 'src/utils/validators/exist.validator';
import { IsUnique } from 'src/utils/validators/unique.validator';
import { User } from '../entities/user.entity';

export class UserDto {
  // @ApiProperty()
  @IsOptional()
  @IsExist([User, 'id'])
  id?: number;

  @ApiProperty({ default: 'Your name', required: true })
  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  level: number;

  @ApiProperty({ default: 'Some@email.com', required: true })
  @IsEmail()
  @IsUnique([User, 'email'])
  email: string;

  @ApiProperty({ default: 'Your password', required: true })
  @IsString()
  password: string;
}

//OmitType = delete salah satu dari dto
//PickType = sebaliknya dari OmitType
export class CreateUserDto extends OmitType(UserDto, ['id']) {}
// export class UserIdDto extends PickType(UserDto, ['id']) {}
export class UserIdDto {
  @ApiProperty()
  @IsOptional()
  @IsExist([User, 'id'])
  id?: number;
}
