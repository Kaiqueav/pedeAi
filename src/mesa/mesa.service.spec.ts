import { Test, TestingModule } from '@nestjs/testing';
import { MesaService } from './mesa.service';

describe('MesaService', () => {
  let service: MesaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MesaService],
    }).compile();

    service = module.get<MesaService>(MesaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
