import { Test, TestingModule } from '@nestjs/testing';
import { IbadahController } from './ibadah.controller';

describe('IbadahController', () => {
  let controller: IbadahController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IbadahController],
    }).compile();

    controller = module.get<IbadahController>(IbadahController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
