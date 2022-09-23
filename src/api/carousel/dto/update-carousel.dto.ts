import { PartialType } from '@nestjs/swagger';
import { CarouselDto } from './create-carousel.dto';

export class UpdateCarouselDto extends PartialType(CarouselDto) {}
