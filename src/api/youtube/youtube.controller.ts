import {
  Controller,
  Delete,
  UnauthorizedException,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwt.guard';
import { InjectUser } from '../../decorators/inject-user.decorator';
import { CreateYoutubeDto } from './dto/create-youtube.dto';
import { UpdateYoutubeDto } from './dto/update-youtube.dto';
import { YoutubeService } from './youtube.service';

@ApiTags('Youtube Content')
@Controller('api/youtube')
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Post('create')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  create(@InjectUser() createYoutubeDto: CreateYoutubeDto, @Request() req) {
    return this.youtubeService.create(createYoutubeDto);
  }

  @Get('getAll')
  findAll() {
    return this.youtubeService.findAll();
  }

  @Get('getOne/:id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  findOne(@Param('id') id: number, @Request() req) {
    return this.youtubeService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  update(
    @Param('id') id: number,
    @InjectUser() updateYoutubeDto: UpdateYoutubeDto,
    @Request() req,
  ) {
    return this.youtubeService.update(+id, updateYoutubeDto);
  }

  @Delete('delete/:id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  remove(@Param('id') id: number, @Request() req) {
    return this.youtubeService.remove(+id);
  }
}
