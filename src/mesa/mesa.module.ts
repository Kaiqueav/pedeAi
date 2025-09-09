import { Module } from '@nestjs/common';
import { MesaService } from './mesa.service';
import { MesaController } from './mesa.controller';
import { Mesa } from './entities/mesa.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mesa])
  ],
  controllers: [MesaController],
  providers: [MesaService],
  exports: [MesaService], 
})
export class MesaModule {}
