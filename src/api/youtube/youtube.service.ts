/* eslint-disable @typescript-eslint/no-var-requires */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateYoutubeDto, UpdateYoutubeDto } from './youtube.dto';
import { Youtube } from './youtube.entity';
const yts = require('yt-search');

@Injectable()
export class YoutubeService {
  constructor(
    @InjectRepository(Youtube)
    private youtubeRepository: Repository<Youtube>,
  ) {}

  public async create(createYoutubeDto: CreateYoutubeDto): Promise<Youtube> {
    try {
      return await this.youtubeRepository.save(createYoutubeDto);
    } catch (error) {
      throw new BadRequestException({
        message: 'Terjadi kesalahan saat menyimpan data!',
      });
    }
  }

  public async findAll() {
    try {
      const youtube: Youtube[] = await this.youtubeRepository.find();
      const result = [];
      for (const v in youtube) {
        const getOne = await this.youtubeRepository
          .createQueryBuilder('youtubes')
          .leftJoinAndSelect('youtubes.user', 'user')
          .where({ id: youtube[v].id })
          .getOne();
        const yt = await yts({ videoId: youtube[v].youtube_id });
        result.push({ ...yt, ...getOne });
      }
      return result;
    } catch (error) {
      throw new BadRequestException({
        message: 'Terjadi kesalahan saat mengambil data!',
      });
    }
  }

  public async findOne(id: number): Promise<Youtube> {
    try {
      const youtube: Youtube = await this.youtubeRepository
        .createQueryBuilder('youtubes')
        .leftJoinAndSelect('youtubes.user', 'user')
        .where({ id })
        .getOne();
      const yt = await yts({ videoId: youtube.youtube_id });
      return { ...youtube, ...yt };
    } catch (error) {
      throw new BadRequestException({
        message: 'Terjadi kesalahan saat mengambil data!',
      });
    }
  }

  public async update(
    id: number,
    updateYoutubeDto: UpdateYoutubeDto,
  ): Promise<Youtube> {
    try {
      updateYoutubeDto.id = id;
      return await this.youtubeRepository.save(updateYoutubeDto);
    } catch (error) {
      throw new BadRequestException({
        message: 'Terjadi kesalahan saat menyimpan data!',
      });
    }
  }

  public async remove(id: number): Promise<Youtube> {
    try {
      const youtube: Youtube = await this.youtubeRepository.findOneBy({
        id,
      });
      return this.youtubeRepository.remove(youtube);
    } catch (error) {
      throw new BadRequestException({
        message: 'Terjadi kesalahan saat menghapus data!',
      });
    }
  }
}
