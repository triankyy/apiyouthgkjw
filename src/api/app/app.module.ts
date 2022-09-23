import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { typeOrmAsyncConfig } from 'src/configs/typeorm.config';
import { ExistValidator } from 'src/validators/exist.validator';
import { UniqueValidator } from 'src/validators/unique.validator';
import { AuthModule } from '../auth/auth.module';
import { CarouselModule } from '../carousel/carousel.module';
import { ContentModule } from '../content/content.module';
import { UserModule } from '../user/user.module';
import { YoutubeModule } from '../youtube/youtube.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*'],
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    UserModule,
    AuthModule,
    ContentModule,
    CarouselModule,
    YoutubeModule,
  ],
  controllers: [AppController],
  providers: [AppService, UniqueValidator, ExistValidator],
})
export class AppModule {}
