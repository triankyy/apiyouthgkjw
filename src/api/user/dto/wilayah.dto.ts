import { ApiProperty, OmitType, PartialType, PickType } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { IsExist } from "src/validators/exist.validator";
import { Wilayah } from "../entities/wilayah.entity";

export class WilayahDto {
      @IsOptional()
      @IsExist([Wilayah, 'id'])
      id?: number;

      @ApiProperty()
      @IsString()
      name: string;
}

export class CreateWilayahDto extends OmitType(WilayahDto, ['id']) {}
export class UpdateWilayahDto extends PartialType(WilayahDto) {}
export class WilayahIdDto extends PickType(WilayahDto, ['id']) {}