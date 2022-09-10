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
import * as fs from 'fs';

@Injectable()
export class CarouselService {
  constructor(
    @InjectRepository(Carousel)
    private carouselRepository: Repository<Carousel>,
  ) {}

  public async create(createCarouselDto: CreateCarouselDto) {
    try {
      return await this.carouselRepository.save(createCarouselDto);
    } catch (error) {
      throw new BadRequestException({
        message: 'Terjadi kesalahan saat menyimpan data!',
      });
    }
  }

  public async findAll(): Promise<Carousel[]> {
    try {
      return await this.carouselRepository.find({
        relations: { user: true },
      });
    } catch (error) {
      throw new BadRequestException({
        message: 'Terjadi kesalahan saat mengambil data!',
      });
    }
  }

  public async findOne(id: number): Promise<Carousel> {
    try {
      return await this.carouselRepository
        .createQueryBuilder('carousel')
        .leftJoinAndSelect('carousel.user', 'user')
        .where({ id })
        .getOne();
    } catch (error) {
      throw new BadRequestException({
        message: 'Terjadi kesalahan saat mengambil data!',
      });
    }
  }

  public async update(
    id: number,
    updateCarouselDto: UpdateCarouselDto,
  ): Promise<Carousel> {
    try {
      updateCarouselDto.id = id;
      return await this.carouselRepository.save(updateCarouselDto);
    } catch (error) {
      throw new BadRequestException({
        message: 'Terjadi kesalahan saat menyimpan data!',
      });
    }
  }

  public async remove(id: number): Promise<Carousel> {
    try {
      const carousel: Carousel = await this.carouselRepository.findOneBy({
        id,
      });
      fs.unlinkSync(`public/carousels/${carousel.image}`);
      return this.carouselRepository.remove(carousel);
    } catch (error) {
      throw new NotFoundException({
        message: 'Terjadi kesalahan saat menghapus data!',
      });
    }
  }

  public async removeMany(ids: number[]): Promise<Carousel[]> {
    try {
      const carousel: Carousel[] = await this.carouselRepository.findBy({
        id: In(ids),
      });
      carousel.map((val: Carousel) =>
        fs.unlinkSync(`public/carousels/${val.image}`),
      );
      return this.carouselRepository.remove(carousel);
    } catch (error) {
      throw new BadRequestException({
        message: 'Terjadi kesalahan saat menghapus data!',
      });
    }
  }
}
