import { Module } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { YoutubeController } from './youtube.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Youtube } from './youtube.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Youtube])],
  controllers: [YoutubeController],
  providers: [YoutubeService],
})
export class YoutubeModule {}
