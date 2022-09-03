import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateCarouselDto } from './dto/create-carousel.dto';
import { UpdateCarouselDto } from './dto/update-carousel.dto';
import { Carousel } from './entities/carousel.entity';

@Injectable()
export class CarouselService {
  constructor(
    @InjectRepository(Carousel)
    private carouselRepository: Repository<Carousel>,
  ) {}
  public async create(createCarouselDto: CreateCarouselDto) {
    const carousel: Carousel = await this.carouselRepository.save(
      createCarouselDto,
    );
    console.log(carousel);
    if (!carousel) throw new BadRequestException();
    return carousel;
  }

  public async findAll(): Promise<Carousel[]> {
    const carousel: Carousel[] = await this.carouselRepository.find({
      relations: { user: true },
    });
    if (!carousel) throw new BadRequestException();
    return carousel;
  }

  public async findOne(id: number): Promise<Carousel> {
    const carousel: Carousel = await this.carouselRepository
      .createQueryBuilder('carousel')
      .leftJoinAndSelect('carousel.user', 'user')
      .where({ id })
      .getOne();
    if (!carousel) throw new NotFoundException();
    return carousel;
  }

  public async update(
    id: number,
    updateCarouselDto: UpdateCarouselDto,
  ): Promise<Carousel> {
    updateCarouselDto.id = id;
    const carousel: Carousel = await this.carouselRepository.save(
      updateCarouselDto,
    );
    if (!carousel) throw new BadRequestException();
    return carousel;
  }

  public async remove(id: number): Promise<Carousel> {
    const carousel: Carousel = await this.carouselRepository.findOneBy({
      id,
    });
    if (!carousel) throw new NotFoundException();
    return this.carouselRepository.remove(carousel);
  }

  public async removeMany(ids: number[]): Promise<Carousel[]> {
    const carousel: Carousel[] = await this.carouselRepository.findBy({
      id: In(ids),
    });
    if (!carousel) throw new BadRequestException();
    return this.carouselRepository.remove(carousel);
  }
}
