import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { Response as ResponseType, Request as RequestType } from 'express';
import { User } from '../user/entities/user.entity';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //cek user
  @Get()
  @UseGuards(JwtGuard)
  checkUser(@Request() req: RequestType): Express.User {
    return req.user;
  }

  //Login
  @Post('login')
  public async login(
    @Body() authDto: AuthDto,
    @Response({ passthrough: true }) res: ResponseType,
  ): Promise<User> {
    const user = await this.authService.checkUser(
      authDto.email, //cek email dan password user apakah ada di database
      authDto.password,
    );

    const { token } = this.authService.generateToken({ id: user.id }); //generate token dari id user

    const d: number = 1 * 24 * 60 * 60 * 1000; //waktu expire token = 1 hari

    //simpan token ke cookie
    res.cookie('token', token, {
      expires: new Date(new Date().getTime() + d),
      sameSite: 'strict',
      httpOnly: true,
    });
    return user;
  }

  //logout
  @UseGuards(JwtGuard)
  @Get('logout')
  public logout(
    @Request() req: RequestType,
    @Response({ passthrough: true }) res: ResponseType,
  ): LogoutResponse {
    return this.authService.logout(req, res);
  }
}

interface LogoutResponse extends Express.User {
  message: string;
}
