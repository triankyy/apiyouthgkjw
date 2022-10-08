import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { IsExist } from 'src/validators/exist.validator';
import { Role } from '../entities/role.entity';

export class UserRoleDto {
  @IsOptional()
  @IsExist([Role, 'id'])
  id?: number;

  @IsString()
  name: string;
}

export class CreateUserRoleDto extends OmitType(UserRoleDto, ['id']) {}
export class UpdateUserRoleDto extends PartialType(UserRoleDto) {}
export class RoleIdDto extends PickType(UserRoleDto, ['id']) {}
