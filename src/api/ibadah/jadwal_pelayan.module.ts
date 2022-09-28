import { Module } from '@nestjs/common';
import { JadwalPelayanService } from './jadwal_pelayan.service';
import { JadwalPelayanController } from './jadwal_pelayan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JadwalPelayan } from './entities/jadwal_pelayan.entity';
import { User } from '../user/entities/user.entity';
import { IbadahController } from './ibadah.controller';
import { IbadahService } from './ibadah.service';
import { Ibadah } from './entities/ibadah.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JadwalPelayan, User, Ibadah])],
  controllers: [JadwalPelayanController, IbadahController],
  providers: [JadwalPelayanService, IbadahService],
  exports: [JadwalPelayanService],
})
export class JadwalPelayanModule {}
