import {
  Body,
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
import { CreateUserDto, UserIdDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto & User> {
    return this.userService.create(createUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get('getAll')
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get('getOne/:id')
  findOne(@Param('id') id: number, @Request() req): Promise<User> {
    if (req.user.id != id) throw new ForbiddenException();
    return this.userService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Patch('update/:id')
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ): Promise<UpdateUserDto & User> {
    if (req.user.id != id) throw new ForbiddenException();
    return this.userService.update(+id, updateUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Delete('delete/:id')
  remove(@Param() id: UserIdDto, @Request() req): Promise<User> {
    if (req.user.level != 2) throw new ForbiddenException();
    return this.userService.remove(id.id);
  }
}
