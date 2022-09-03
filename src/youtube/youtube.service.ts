/* eslint-disable @typescript-eslint/no-var-requires */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateYoutubeDto } from './dto/create-youtube.dto';
import { UpdateYoutubeDto } from './dto/update-youtube.dto';
import { Youtube } from './entities/youtube.entity';
const yts = require('yt-search');

@Injectable()
export class YoutubeService {
  constructor(
    @InjectRepository(Youtube)
    private youtubeRepository: Repository<Youtube>,
  ) {}

  public async create(createYoutubeDto: CreateYoutubeDto): Promise<Youtube> {
    const youtube: Youtube = await this.youtubeRepository.save(
      createYoutubeDto,
    );
    if (!youtube) throw new BadRequestException();
    return youtube;
  }

  public async findAll() {
    const youtube: Youtube[] = await this.youtubeRepository.find();
    if (!youtube) throw new NotFoundException();
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
  }

  public async findOne(id: number): Promise<Youtube> {
    const youtube: Youtube = await this.youtubeRepository
      .createQueryBuilder('youtubes')
      .leftJoinAndSelect('youtubes.user', 'user')
      .where({ id })
      .getOne();
    if (!youtube) throw new NotFoundException();
    const yt = await yts({ videoId: youtube.youtube_id });
    return { ...youtube, ...yt };
  }

  public async update(
    id: number,
    updateYoutubeDto: UpdateYoutubeDto,
  ): Promise<Youtube> {
    updateYoutubeDto.id = id;
    const youtube: Youtube = await this.youtubeRepository.save(
      updateYoutubeDto,
    );
    if (!youtube) throw new BadRequestException();
    return youtube;
  }

  public async remove(id: number): Promise<Youtube> {
    const youtube: Youtube = await this.youtubeRepository.findOneBy({
      id,
    });
    if (!youtube) throw new BadRequestException();
    return this.youtubeRepository.remove(youtube);
  }
}
