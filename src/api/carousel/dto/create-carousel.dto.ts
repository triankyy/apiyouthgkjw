import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString } from 'class-validator';
import { UserDto } from '../../user/dto/user.dto';
import { IsExist } from '../../../validators/exist.validator';
import { Carousel } from '../entities/carousel.entity';

export class CarouselDto {
  @ApiProperty()
  @IsExist([Carousel, 'id'])
  id: number;

  @ApiProperty({ format: 'binary', required: true })
  @IsOptional()
  image?: string;

  @ApiProperty()
  @IsString()
  label: string;

  @IsObject()
  user: UserDto;
}

export class CreateCarouselDto extends OmitType(CarouselDto, ['id']) {}
export class CarouselIdDto extends PickType(CarouselDto, ['id']) {}
