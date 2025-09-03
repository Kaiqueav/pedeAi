import { Module } from '@nestjs/common';
import { MesaService } from './mesa.service';
import { MesaController } from './mesa.controller';

@Module({
  controllers: [MesaController],
  providers: [MesaService],
})
export class MesaModule {}
