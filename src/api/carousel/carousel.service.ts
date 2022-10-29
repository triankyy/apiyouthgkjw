import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateCarouselDto, UpdateCarouselDto } from './carousel.dto';
import { Carousel } from './carousel.entity';
import * as fs from 'fs';

@Injectable()
export class CarouselService {
  constructor(
    @InjectRepository(Carousel)
    private carouselRepository: Repository<Carousel>,
  ) {}

  /**
   * Create carousel
   */
  public async create(createCarouselDto: CreateCarouselDto) {
    try {
      return await this.carouselRepository.save(createCarouselDto); //simpan ke database
    } catch (error) {
      throw new BadRequestException({
        message: [error ?? 'Terjadi kesalahan saat menyimpan data!'],
      });
    }
  }

  /**
   * get all data carousel
   */
  public async findAll(): Promise<Carousel[]> {
    try {
      return await this.carouselRepository.find({
        relations: {
          user: {
            roles: true,
          },
        },
      });
    } catch (error) {
      throw new BadRequestException({
        message: [error ?? 'Terjadi kesalahan saat mengambil data!'],
      });
    }
  }

  /**
   * get data carousel
   */
  public async findOne(id: number): Promise<Carousel> {
    try {
      return await this.carouselRepository
        .createQueryBuilder('carousel')
        .leftJoinAndSelect('carousel.user', 'user')
        .leftJoinAndSelect('user.roles', 'roles')
        .where({ id })
        .getOne();
    } catch (error) {
      throw new BadRequestException({
        message: [error ?? 'Terjadi kesalahan saat mengambil data!'],
      });
    }
  }

  /**
   * update data carousel
   */
  public async update(
    id: number,
    updateCarouselDto: UpdateCarouselDto,
  ): Promise<Carousel> {
    try {
      updateCarouselDto.id = id;
      return await this.carouselRepository.save(updateCarouselDto);
    } catch (error) {
      throw new BadRequestException({
        message: [error ?? 'Terjadi kesalahan saat menyimpan data!'],
      });
    }
  }

  /**
   * hapus data carousel
   */
  public async remove(id: number): Promise<Carousel> {
    try {
      const carousel: Carousel = await this.carouselRepository.findOneBy({
        id,
      });
      fs.unlinkSync(`public/carousels/${carousel.image}`);
      return this.carouselRepository.remove(carousel);
    } catch (error) {
      throw new NotFoundException({
        message: [error ?? 'Terjadi kesalahan saat menghapus data!'],
      });
    }
  }

  /**
   * hapus beberapa data carousel
   */
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
      // throw new InternalServerErrorException();
      throw new BadRequestException({
        message: [error ?? 'Terjadi kesalahan saat menghapus data!'],
      });
    }
  }
}
