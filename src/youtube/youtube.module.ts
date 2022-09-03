import { Module } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { YoutubeController } from './youtube.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Youtube } from './entities/youtube.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Youtube])],
  controllers: [YoutubeController],
  providers: [YoutubeService],
})
export class YoutubeModule {}
