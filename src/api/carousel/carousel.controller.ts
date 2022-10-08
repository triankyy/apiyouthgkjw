import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from '../auth/jwt.guard';
import { storage } from '../../configs/storage.config';
import { InjectUser } from '../../decorators/inject-user.decorator';
import { CarouselService } from './carousel.service';
import { CreateCarouselDto, UpdateCarouselDto } from './carousel.dto';
import { Carousel } from './carousel.entity';
import { RoleGuard } from '../auth/role.guard';

@Controller('api/carousel')
export class CarouselController {
  constructor(private readonly carouselService: CarouselService) {}

  //create data carousel
  @Post('create')
  @UseGuards(JwtGuard, RoleGuard)
  @UseInterceptors(FileInterceptor('image', { storage: storage('carousels') }))
  create(
    @InjectUser() createCarouselDto: CreateCarouselDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (!image)
      throw new BadRequestException({ message: 'Gambar tidak boleh kosong!' });
    createCarouselDto.image = image.filename;
    return this.carouselService.create(createCarouselDto);
  }

  //get all data carousels
  @Get('getAll')
  findAll(): Promise<Carousel[]> {
    return this.carouselService.findAll();
  }

  //get one data carousel
  @Get('getOne/:id')
  findOne(@Param('id') id: number): Promise<Carousel> {
    return this.carouselService.findOne(id);
  }

  //update data carousel
  @Patch('update/:id')
  @UseGuards(JwtGuard, RoleGuard)
  @UseInterceptors(FileInterceptor('image', { storage: storage('carousels') }))
  update(
    @Param('id') id: number,
    @InjectUser() updateCarouselDto: UpdateCarouselDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Carousel> {
    if (image) updateCarouselDto.image = image.filename;
    return this.carouselService.update(id, updateCarouselDto);
  }

  //hapus data carousel
  @Delete('delete/:id')
  @UseGuards(JwtGuard, RoleGuard)
  remove(@Param('id') id: number): Promise<Carousel> {
    return this.carouselService.remove(id);
  }

  //hapus beberapa carousel
  @Delete('deleteMany')
  @UseGuards(JwtGuard, RoleGuard)
  removeMany(@Body('ids') ids: number[]): Promise<Carousel[]> {
    return this.carouselService.removeMany(ids);
  }
}
