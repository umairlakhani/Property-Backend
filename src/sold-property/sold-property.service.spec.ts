import { Test, TestingModule } from '@nestjs/testing';
import { SoldPropertyService } from './sold-property.service';

describe('SoldPropertyService', () => {
  let service: SoldPropertyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SoldPropertyService],
    }).compile();

    service = module.get<SoldPropertyService>(SoldPropertyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
