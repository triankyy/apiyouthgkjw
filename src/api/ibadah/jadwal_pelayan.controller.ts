import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JadwalPelayanService } from './jadwal_pelayan.service';
import {
  CreateJadwalPelayanDto,
  UpdateJadwalPelayanDto,
} from './dto/jadwal_pelayan.dto';

@Controller('api/jadwal')
export class JadwalPelayanController {
  constructor(private readonly jadwalPelayanService: JadwalPelayanService) {}

  @Post('create')
  create(@Body() createJadwalPelayanDto: CreateJadwalPelayanDto) {
    return this.jadwalPelayanService.create(createJadwalPelayanDto);
  }

  @Get('getAll')
  findAll() {
    return this.jadwalPelayanService.findAll();
  }

  @Get('findOneMonth')
  public findOneMonth(
    @Body('month') month: number,
    @Body('year') year: number,
  ) {
    return this.jadwalPelayanService.findOneMonth(month, year);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.jadwalPelayanService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateJadwalPelayanDto: UpdateJadwalPelayanDto,
  ) {
    return this.jadwalPelayanService.update(id, updateJadwalPelayanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.jadwalPelayanService.remove(id);
  }
}
