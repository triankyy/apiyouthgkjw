import { OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNumber,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { User } from 'src/api/user/entities/user.entity';
import { IsExist } from 'src/validators/exist.validator';
import { Ibadah } from '../entities/ibadah.entity';
import { JadwalPelayan } from '../entities/jadwal_pelayan.entity';

export class JadwalPelayanDto {
  @IsOptional()
  @IsExist([JadwalPelayan, 'id'])
  id?: number;

  @IsObject()
  ibadah: Ibadah;

  @IsObject()
  pelayan: User;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => User)
  wl?: User[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => User)
  musik?: User[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => User)
  singer?: User[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => User)
  operator?: User[];

  @IsDate()
  tanggal: Date;
}

export class CreateJadwalPelayanDto extends OmitType(JadwalPelayanDto, [
  'id',
  'ibadah',
  'pelayan',
  'wl',
  'musik',
  'singer',
  'operator',
]) {
  @IsNumber()
  pelayan: number;

  @IsNumber()
  ibadah: number;

  @IsOptional()
  @IsArray()
  wl: number[];

  @IsOptional()
  @IsArray()
  musik: number[];

  @IsOptional()
  @IsArray()
  singer: number[];

  @IsOptional()
  @IsArray()
  operator: number[];
}

export class UpdateJadwalPelayanDto extends PartialType(
  CreateJadwalPelayanDto,
) {
  @IsNumber()
  id: number;
}
