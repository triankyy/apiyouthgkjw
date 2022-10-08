import { IsObject, IsOptional, IsString } from 'class-validator';
import { UserDto } from '../user/dto/user.dto';
import { IsExist } from '../../validators/exist.validator';
import { Carousel } from './carousel.entity';
import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';

export class CarouselDto {
  @IsExist([Carousel, 'id'])
  id: number;

  @IsOptional()
  image?: string;

  @IsString()
  label: string;

  @IsObject()
  user: UserDto;
}

export class CreateCarouselDto extends OmitType(CarouselDto, ['id']) {}
export class CarouselIdDto extends PickType(CarouselDto, ['id']) {}
export class UpdateCarouselDto extends PartialType(CarouselDto) {}
