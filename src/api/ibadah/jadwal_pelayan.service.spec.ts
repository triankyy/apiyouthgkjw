import { Test, TestingModule } from '@nestjs/testing';
import { JadwalPelayanService } from './jadwal_pelayan.service';

describe('JadwalPelayanService', () => {
  let service: JadwalPelayanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JadwalPelayanService],
    }).compile();

    service = module.get<JadwalPelayanService>(JadwalPelayanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
