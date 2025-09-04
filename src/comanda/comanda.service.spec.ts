import { Test, TestingModule } from '@nestjs/testing';
import { ComandaService } from './comanda.service';

describe('ComandaService', () => {
  let service: ComandaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComandaService],
    }).compile();

    service = module.get<ComandaService>(ComandaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
