import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WilayahService } from './wilayah.service';
import { CreateWilayahDto, UpdateWilayahDto } from './dto/wilayah.dto';

@Controller('api/user/wilayah')
export class WilayahController {
  constructor(private readonly wilayahService: WilayahService) {}

  @Post('create')
  create(@Body() createWilayahDto: CreateWilayahDto) {
    return this.wilayahService.create(createWilayahDto);
  }

  @Get('getAll')
  findAll() {
    return this.wilayahService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: number) {
    return this.wilayahService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: number, @Body() updateWilayahDto: UpdateWilayahDto) {
    return this.wilayahService.update(id, updateWilayahDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    return this.wilayahService.remove(id);
  }

  @Delete('deleteMany')
  removeMany(@Body('ids') ids: number[]) {
    return this.wilayahService.removeMany(ids);
  }
}
