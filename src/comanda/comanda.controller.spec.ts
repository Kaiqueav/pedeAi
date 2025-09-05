import { Test, TestingModule } from '@nestjs/testing';
import { ComandaController } from './comanda.controller';
import { ComandaService } from './comanda.service';

describe('ComandaController', () => {
  let controller: ComandaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComandaController],
      providers: [ComandaService],
    }).compile();

    controller = module.get<ComandaController>(ComandaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
