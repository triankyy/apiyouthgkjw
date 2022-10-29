import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateIbadahDto, UpdateIbadahDto } from './dto/ibadah.dto';
import { Ibadah } from './entities/ibadah.entity';

@Injectable()
export class IbadahService {
  constructor(
    @InjectRepository(Ibadah) private ibadahRepository: Repository<Ibadah>,
  ) {}

  /**
   * create
   */
  public async create(
    createIbadahDto: CreateIbadahDto,
  ): Promise<CreateIbadahDto & Ibadah> {
    try {
      return await this.ibadahRepository.save(createIbadahDto);
    } catch (error) {
      throw new BadRequestException({
        message: [error ?? 'Terjadi kesalahan saat menyimpan data!'],
      });
    }
  }

  /**
   * getOne
   */
  public async getOne(id: number): Promise<Ibadah> {
    try {
      return await this.ibadahRepository.findOneBy({ id });
    } catch (error) {
      throw new BadRequestException({
        message: [error ?? 'Terjadi kesalahan saat mengambil data!'],
      });
    }
  }

  /**
   * getAll
   */
  public async getAll(): Promise<Ibadah[]> {
    try {
      return await this.ibadahRepository.find();
    } catch (error) {
      throw new BadRequestException({
        message: [error ?? 'Terjadi kesalahan saat mengambil data!'],
      });
    }
  }

  /**
   * update
   */
  public async update(id: number, updateIbadahDto: UpdateIbadahDto) {
    try {
      updateIbadahDto.id = id;
      return await this.ibadahRepository.save(updateIbadahDto);
    } catch (error) {
      throw new BadRequestException({
        message: [error ?? 'Terjadi kesalahan saat menyimpan data!'],
      });
    }
  }

  /**
   * remove
   */
  public async remove(id: number): Promise<Ibadah> {
    try {
      const ibadah: Ibadah = await this.ibadahRepository.findOneBy({ id });
      return await this.ibadahRepository.remove(ibadah);
    } catch (error) {
      throw new BadRequestException({
        message: [error ?? 'Terjadi kesalahan saat menghapus data!'],
      });
    }
  }

  /**
   * removeMany
   */
  public async removeMany(ids: number[]): Promise<Ibadah[]> {
    try {
      const ibadah: Ibadah[] = await this.ibadahRepository.findBy({
        id: In(ids),
      });
      return await this.ibadahRepository.remove(ibadah);
    } catch (error) {
      throw new BadRequestException({
        message: [error ?? 'Terjadi kesalahan saat menghapus data!'],
      });
    }
  }
}
