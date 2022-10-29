import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateWilayahDto, UpdateWilayahDto } from './dto/wilayah.dto';
import { Wilayah } from './entities/wilayah.entity';

@Injectable()
export class WilayahService {
  constructor(
    @InjectRepository(Wilayah)
    private readonly wilayahRepository: Repository<Wilayah>,
  ) {}

  /**
   * create
   */
  public async create(createWilayahDto: CreateWilayahDto) {
    try {
      return await this.wilayahRepository.save(createWilayahDto);
    } catch (error) {
      throw new BadRequestException({
        message: [error ?? 'Terjadi kesalahan saat menyimpan data!'],
      });
    }
  }

  /**
   * findAll
   */
  public async findAll() {
    try {
      return await this.wilayahRepository.find();
    } catch (error) {
      throw new BadRequestException({
        message: [error ?? 'terjadi kesalahan saat mengambil data!'],
      });
    }
  }

  /**
   * findOne
   */
  public async findOne(id: number) {
    try {
      return await this.wilayahRepository.findOneBy({ id });
    } catch (error) {
      throw new BadRequestException({
        message: [error ?? 'terjadi kesalahan saat mengambil data!'],
      });
    }
  }

  /**
   * update
   */
  public async update(id: number, updateWilayahDto: UpdateWilayahDto) {
    try {
      updateWilayahDto.id = id;
      return await this.wilayahRepository.save(updateWilayahDto);
    } catch (error) {
      throw new BadRequestException({
        message: [error ?? 'Terjadi kesalahan saat menyimpan data!'],
      });
    }
  }

  /**
   * remove
   */
  public async remove(id: number) {
    try {
      const wilayah: Wilayah = await this.wilayahRepository.findOneBy({ id });
      return await this.wilayahRepository.remove(wilayah);
    } catch (error) {
      throw new BadRequestException({
        message: [error ?? 'Terjadi kesalahan saat menghapus data!'],
      });
    }
  }

  /**
   * removeMany
   */
  public async removeMany(ids: number[]) {
    try {
      const wilayah: Wilayah[] = await this.wilayahRepository.findBy({
        id: In(ids),
      });
      return await this.wilayahRepository.remove(wilayah);
    } catch (error) {
      throw new BadRequestException({
        message: [error ?? 'Terjadi kesalahan saat menghapus data!'],
      });
    }
  }
}
