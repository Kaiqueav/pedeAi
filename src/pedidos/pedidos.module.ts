import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { ItemPedido } from './entities/item-pedido.entity';
import { Produto } from 'src/produto/entities/produto.entity';
import { MesaModule } from 'src/mesa/mesa.module';
import { ComandaModule } from 'src/comanda/comanda.module';
import { EventsModule } from 'src/events/events.module'; 
@Module({
  imports:[
    TypeOrmModule.forFeature([Pedido, ItemPedido, Produto]),
    ComandaModule,
    MesaModule,
    EventsModule,
  ],
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class PedidosModule {}
