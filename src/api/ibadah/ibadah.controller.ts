import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/jwt.guard';
import { RoleGuard } from '../auth/role.guard';
import { CreateIbadahDto, UpdateIbadahDto } from './dto/ibadah.dto';
import { Ibadah } from './entities/ibadah.entity';
import { IbadahService } from './ibadah.service';

@Controller('api/ibadah')
export class IbadahController {
  constructor(private readonly ibadahService: IbadahService) {}

  /**
   * create
   */
  // @UseGuards(JwtGuard, RoleGuard)
  @Post('create')
  public async create(
    @Body() createIbadahDto: CreateIbadahDto,
  ): Promise<CreateIbadahDto & Ibadah> {
    return await this.ibadahService.create(createIbadahDto);
  }

  /**
   * getAll
   */
  @Get('getAll')
  public async getAll(): Promise<Ibadah[]> {
    return await this.ibadahService.getAll();
  }

  /**
   * getOne
   */
  @Get('getOne/:id')
  public async getOne(@Param('id') id: number): Promise<Ibadah> {
    return await this.ibadahService.getOne(id);
  }

  /**
   * update
   */
  // @UseGuards(JwtGuard, RoleGuard)
  @Patch('update/:id')
  public async update(
    @Param('id') id: number,
    @Body() updateIbadahDto: UpdateIbadahDto,
  ) {
    return await this.ibadahService.update(id, updateIbadahDto);
  }

  /**
   * remove
   */
  // @UseGuards(JwtGuard, RoleGuard)
  @Delete('delete/:id')
  public async remove(@Param('id') id: number): Promise<Ibadah> {
    return await this.ibadahService.remove(id);
  }

  /**
   * removeMany
   */
  // @UseGuards(JwtGuard, RoleGuard)
  @Delete('deleteMany')
  public async removeMany(@Body('ids') ids: number[]): Promise<Ibadah[]> {
    return await this.ibadahService.removeMany(ids);
  }
}
