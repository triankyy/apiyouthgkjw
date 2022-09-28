import { Test, TestingModule } from '@nestjs/testing';
import { JadwalPelayanController } from './jadwal_pelayan.controller';
import { JadwalPelayanService } from './jadwal_pelayan.service';

describe('JadwalPelayanController', () => {
  let controller: JadwalPelayanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JadwalPelayanController],
      providers: [JadwalPelayanService],
    }).compile();

    controller = module.get<JadwalPelayanController>(JadwalPelayanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
