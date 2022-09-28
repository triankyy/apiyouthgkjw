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
import { CreateUserRoleDto, UpdateUserRoleDto } from './dto/role.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwt.guard';
import { RoleGuard } from '../auth/role.guard';
import { Role } from './entities/role.entity';
import { RoleService } from './role.service';

@ApiTags('User Roles')
@Controller('api/user/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  /**
   * create
   */
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RoleGuard)
  @ApiBearerAuth()
  @Post('create')
  public async create(
    @Body() createUserRoleDto: CreateUserRoleDto,
  ): Promise<CreateUserRoleDto> {
    return this.roleService.create(createUserRoleDto);
  }

  /**
   * findAll
   */
  @Get('getAll')
  public async findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  /**
   * findOne
   */
  @Get('getOne/:id')
  public async findOne(@Param('id') id: number): Promise<Role> {
    return this.roleService.findOne(id);
  }

  /**
   * update
   */
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RoleGuard)
  @Patch('update/:id')
  public async update(
    @Param('id') id: number,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<UpdateUserRoleDto> {
    return this.roleService.update(id, updateUserRoleDto);
  }

  /**
   * remove
   */
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RoleGuard)
  @Delete('delete/:id')
  public async remove(@Param('id') id: number): Promise<Role> {
    return this.roleService.remove(id);
  }

  /**
   * removeMany
   */
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RoleGuard)
  @Delete('deleteMany')
  public async removeMany(@Body('ids') ids: number[]): Promise<Role[]> {
    return this.roleService.removeMany(ids);
  }
}
