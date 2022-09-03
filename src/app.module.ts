import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CarouselModule } from './carousel/carousel.module';
import { ContentModule } from './content/content.module';
import { UserModule } from './user/user.module';
import { typeOrmAsyncConfig } from './utils/configs/typeorm.config';
import { ExistValidator } from './utils/validators/exist.validator';
import { UniqueValidator } from './utils/validators/unique.validator';
import { YoutubeModule } from './youtube/youtube.module';

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
