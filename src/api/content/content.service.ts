import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Content } from './entities/content.entity';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content) private contentRepository: Repository<Content>,
  ) {}

  public async create(createContentDto: CreateContentDto) {
    const content: Content = await this.contentRepository.save(
      createContentDto,
    );
    if (!content) throw new BadRequestException();
    return content;
  }

  public async findAll(): Promise<Content[]> {
    const content: Content[] = await this.contentRepository.find({
      relations: { user: true },
    });
    if (!content) throw new BadRequestException();
    return content;
  }

  public async findOne(id: number): Promise<Content> {
    const content: Content = await this.contentRepository
      .createQueryBuilder('content')
      .leftJoinAndSelect('content.user', 'users')
      .where({ id })
      .getOne();
    if (!content) throw new BadRequestException();
    return content;
  }

  public async update(
    id: number,
    updateContentDto: UpdateContentDto,
  ): Promise<Content> {
    updateContentDto.id = id;
    const content: Content = await this.contentRepository.save(
      updateContentDto,
    );
    if (!content) throw new BadRequestException();
    return content;
  }

  public async remove(id: number): Promise<Content> {
    const content: Content = await this.contentRepository.findOneBy({ id });
    if (!content) throw new BadRequestException();
    return this.contentRepository.remove(content);
  }
}
