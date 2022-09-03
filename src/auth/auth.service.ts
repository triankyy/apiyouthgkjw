import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async checkUser(email: string, password: string): Promise<User> {
    try {
      const user: User = await this.userService.findEmail(email);
      const valid: boolean = this.userService.comparePassword(
        password,
        user.password,
      );
      if (valid) return user;
      throw new BadRequestException();
    } catch (error) {
      throw new BadRequestException({
        ...error?.response,
        message: 'Wrong email or password!',
      });
    }
  }

  public generateToken(user: any): Record<string, string> {
    const dataToken: Record<string, number> = { id: user.id };
    const token = this.jwtService.sign(dataToken);
    return { token };
  }
}
