import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwt.guard';
import { storage } from '../../configs/storage.config';
import { InjectUser } from '../../decorators/inject-user.decorator';
import { CarouselService } from './carousel.service';
import { CreateCarouselDto } from './dto/create-carousel.dto';
import { UpdateCarouselDto } from './dto/update-carousel.dto';
import { Carousel } from './entities/carousel.entity';

@ApiTags('Carousels')
@Controller('api/carousel')
export class CarouselController {
  constructor(private readonly carouselService: CarouselService) {}

  @Post('create')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateCarouselDto })
  @UseInterceptors(FileInterceptor('image', { storage: storage('carousels') }))
  create(
    @InjectUser() createCarouselDto: CreateCarouselDto,
    @UploadedFile() image: Express.Multer.File,
    @Request() req,
  ) {
    if (req.user.level != 2) throw new UnauthorizedException();
    if (!image)
      throw new BadRequestException({ message: 'Image cannot be empty!' });
    createCarouselDto.image = image.filename;
    return this.carouselService.create(createCarouselDto);
  }

  @Get('getAll')
  findAll(): Promise<Carousel[]> {
    return this.carouselService.findAll();
  }

  @Get('getOne/:id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  findOne(@Param('id') id: number, @Request() req): Promise<Carousel> {
    if (req.user.level != 2) throw new UnauthorizedException();
    return this.carouselService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateCarouselDto })
  @UseInterceptors(FileInterceptor('image', { storage: storage('carousels') }))
  update(
    @Param('id') id: number,
    @InjectUser() updateCarouselDto: UpdateCarouselDto,
    @UploadedFile() image: Express.Multer.File,
    @Request() req,
  ): Promise<Carousel> {
    if (req.user.level != 2) throw new UnauthorizedException();
    if (image) updateCarouselDto.image = image.filename;
    return this.carouselService.update(+id, updateCarouselDto);
  }

  @Delete('delete/:id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  remove(@Param('id') id: number, @Request() req): Promise<Carousel> {
    if (req.user.level != 2) throw new UnauthorizedException();
    return this.carouselService.remove(+id);
  }

  @Delete('deleteMany')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  removeMany(@Body('ids') ids: number[], @Request() req): Promise<Carousel[]> {
    if (req.user.level != 2) throw new UnauthorizedException();
    return this.carouselService.removeMany(ids);
  }
}
