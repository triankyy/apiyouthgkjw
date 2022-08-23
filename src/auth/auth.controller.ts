import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response as ResponseType, Request as RequestType } from 'express';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  checkUser(@Request() req: RequestType): Express.User {
    return req.user;
  }

  @Post('login')
  public async login(
    @Body() authDto: AuthDto,
    @Response({ passthrough: true }) res: ResponseType,
  ): Promise<Record<string, string>> {
    const { id } = await this.authService.checkUser(
      authDto.email,
      authDto.password,
    );
    const token = this.authService.generateToken({ id });
    const d: number = 1 * 24 * 60 * 60 * 1000;
    res.cookie('token', token.token, {
      expires: new Date(new Date().getTime() + d),
      sameSite: 'strict',
      httpOnly: true,
    });
    return token;
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get('logout')
  public logout(
    @Request() req: RequestType,
    @Response({ passthrough: true }) res: ResponseType,
  ): LogoutResponse {
    const user: Express.User = req.user;
    if (!user) throw new NotFoundException();
    if (!req.cookies) throw new NotFoundException();
    res.clearCookie('token');
    return { ...user, message: 'Berhasil Logout' };
  }
}

interface LogoutResponse extends Express.User {
  message: string;
}
