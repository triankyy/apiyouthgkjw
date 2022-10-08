import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/jwt.guard';
import { InjectUser } from '../../decorators/inject-user.decorator';
import { YoutubeService } from './youtube.service';
import { CreateYoutubeDto, UpdateYoutubeDto } from './youtube.dto';

@Controller('api/youtube')
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Post('create')
  @UseGuards(JwtGuard)
  create(@InjectUser() createYoutubeDto: CreateYoutubeDto) {
    return this.youtubeService.create(createYoutubeDto);
  }

  @Get('getAll')
  findAll() {
    return this.youtubeService.findAll();
  }

  @Get('getOne/:id')
  @UseGuards(JwtGuard)
  findOne(@Param('id') id: number) {
    return this.youtubeService.findOne(id);
  }

  @Patch('update/:id')
  @UseGuards(JwtGuard)
  update(
    @Param('id') id: number,
    @InjectUser() updateYoutubeDto: UpdateYoutubeDto,
  ) {
    return this.youtubeService.update(id, updateYoutubeDto);
  }

  @Delete('delete/:id')
  @UseGuards(JwtGuard)
  remove(@Param('id') id: number) {
    return this.youtubeService.remove(id);
  }
}
