import { Controller, Get, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './http/auth/auth.service';

@ApiTags('Home')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @Render('index')
  getHello() {
    // return this.appService.getHello();
  }

  @Get('generateToken')
  async freeToken(): Promise<Record<string, string>> {
    const { id } = await this.authService.checkUser('dummy@email.com', 'dummy');
    return this.authService.generateToken({ id });
  }
}
