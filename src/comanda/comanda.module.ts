import { Module } from '@nestjs/common';
import { ComandaService } from './comanda.service';
import { ComandaController } from './comanda.controller';

@Module({
  controllers: [ComandaController],
  providers: [ComandaService],
})
export class ComandaModule {}
