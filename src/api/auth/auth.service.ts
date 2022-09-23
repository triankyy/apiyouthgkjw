import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { Response as ResponseType, Request as RequestType } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * login
   */
  // public async login(authDto: AuthDto, res: ResponseType) {
  //   try {
  //     const user = await this.checkUser(
  //       authDto.email, //cek email dan password user apakah ada di database
  //       authDto.password,
  //     );

  //     const { token } = this.generateToken({ id: user.id }); //generate token dari id user

  //     const d: number = 1 * 24 * 60 * 60 * 1000; //waktu expire token = 1 hari

  //     //simpan token ke cookie
  //     res.cookie('token', token, {
  //       expires: new Date(new Date().getTime() + d),
  //       sameSite: 'strict',
  //       httpOnly: true,
  //     });
  //     return user;
  //   } catch (error) {}
  // }

  /**
   * checkUser
   */
  public async checkUser(email: string, password: string): Promise<User> {
    try {
      const user: User = await this.userService.findEmail(email); //cek user dari email

      //compare password user dengan database
      const valid: boolean = this.userService.comparePassword(
        password,
        user.password,
      );

      if (valid) return user;
      else throw new BadRequestException();
    } catch (error) {
      throw new BadRequestException({
        ...error?.response,
        message: 'Email atau password salah!',
      });
    }
  }

  /**
   * logout
   */
  public logout(req: RequestType, res: ResponseType): LogoutResponse {
    try {
      const user: Express.User = req.user;
      if (!user) throw new BadRequestException();
      if (!req.cookies) throw new BadRequestException();
      res.clearCookie('token');
      return { ...user, message: 'Berhasil Logout' };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  public generateToken(user: any): Record<string, string> {
    const dataToken: Record<string, number> = { id: user.id };
    const token = this.jwtService.sign(dataToken);
    return { token };
  }
}

interface LogoutResponse extends Express.User {
  message: string;
}
