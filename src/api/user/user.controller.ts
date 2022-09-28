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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwt.guard';
import { RoleGuard } from '../auth/role.guard';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * buat user baru
   */
  // @ApiBearerAuth()
  // @UseGuards(JwtGuard, RoleGuard)
  @Post('create')
  public async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /**
   * get semua data user
   */
  @Get('getAll')
  public async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  /**
   * get data user berdasarkan id
   */
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RoleGuard)
  @UseGuards(JwtGuard)
  @Get('getOne/:id')
  public async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  /**
   * update data user
   */
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RoleGuard)
  @Patch('update/:id')
  public async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  /**
   * hapus data user
   */
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RoleGuard)
  @Delete('delete/:id')
  public async remove(@Param('id') id: number): Promise<User> {
    return this.userService.remove(id);
  }

  /**
   * hapus data user
   */
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RoleGuard)
  @Delete('deleteMany')
  public async removeMany(@Body('ids') ids: number[]): Promise<User[]> {
    return this.userService.removeMany(ids);
  }
}
