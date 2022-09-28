import { OmitType, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { IsExist } from 'src/validators/exist.validator';
import { Ibadah } from '../entities/ibadah.entity';

export class IbadahDto {
  @IsOptional()
  @IsNumber()
  @IsExist([Ibadah, 'id'])
  id?: number;

  @IsString()
  name: string;
}

export class CreateIbadahDto extends OmitType(IbadahDto, ['id']) {}
export class UpdateIbadahDto extends PartialType(IbadahDto) {}
