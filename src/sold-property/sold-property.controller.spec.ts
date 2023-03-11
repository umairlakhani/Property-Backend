import { Test, TestingModule } from '@nestjs/testing';
import { SoldPropertyController } from './sold-property.controller';

describe('SoldPropertyController', () => {
  let controller: SoldPropertyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoldPropertyController],
    }).compile();

    controller = module.get<SoldPropertyController>(SoldPropertyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
