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
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwt.guard';
import { storage } from '../../configs/storage.config';
import { InjectUser } from '../../decorators/inject-user.decorator';
import { CarouselService } from './carousel.service';
import { CreateCarouselDto } from './dto/create-carousel.dto';
import { UpdateCarouselDto } from './dto/update-carousel.dto';
import { Carousel } from './entities/carousel.entity';
import { RoleGuard } from '../auth/role.guard';

@ApiTags('Carousels')
@Controller('api/carousel')
export class CarouselController {
  constructor(private readonly carouselService: CarouselService) {}

  //create data carousel
  @Post('create')
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RoleGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateCarouselDto })
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
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RoleGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateCarouselDto })
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
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RoleGuard)
  remove(@Param('id') id: number): Promise<Carousel> {
    return this.carouselService.remove(id);
  }

  //hapus beberapa carousel
  @Delete('deleteMany')
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RoleGuard)
  removeMany(@Body('ids') ids: number[]): Promise<Carousel[]> {
    return this.carouselService.removeMany(ids);
  }
}
