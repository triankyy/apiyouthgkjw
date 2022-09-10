import {
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwt.guard';
import { storage } from '../../configs/storage.config';
import { InjectUser } from '../../decorators/inject-user.decorator';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Content } from './entities/content.entity';

@ApiTags('Contents')
@Controller('api/content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post('create')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateContentDto })
  @UseInterceptors(FileInterceptor('file', { storage: storage('contents') }))
  create(
    @InjectUser() createContentDto: CreateContentDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ): Promise<Content> {
    if (req.user.level != 2) throw new ForbiddenException();
    createContentDto.file = file.filename;
    return this.contentService.create(createContentDto);
  }

  @Get('getAll')
  findAll(): Promise<Content[]> {
    return this.contentService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: number): Promise<Content> {
    return this.contentService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateContentDto })
  @UseInterceptors(FileInterceptor('file', { storage: storage('contents') }))
  update(
    @Param('id') id: number,
    @InjectUser() updateContentDto: UpdateContentDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ): Promise<Content> {
    if (req.user.level != 2) throw new ForbiddenException();
    if (file) updateContentDto.file = file.filename;
    return this.contentService.update(+id, updateContentDto);
  }

  @Delete('delete/:id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  remove(@Param('id') id: number, @Request() req): Promise<Content> {
    if (req.user.level != 2) throw new ForbiddenException();
    return this.contentService.remove(+id);
  }
}
