import {
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';
import { InjectUser } from 'src/utils/decorators/inject-user.decorator';
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
    if (req.user.level != 2) throw new ForbiddenException();
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
    if (req.user.level != 2) throw new ForbiddenException();
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
    if (req.user.level != 2) throw new ForbiddenException();
    return this.youtubeService.update(+id, updateYoutubeDto);
  }

  @Delete('delete/:id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  remove(@Param('id') id: number, @Request() req) {
    if (req.user.level != 2) throw new ForbiddenException();
    return this.youtubeService.remove(+id);
  }
}
