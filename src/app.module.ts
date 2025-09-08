import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { ProdutoController } from './produto/produto.controller';
import { ProdutoService } from './produto/produto.service';
import { ProdutoModule } from './produto/produto.module';
import { MesaModule } from './mesa/mesa.module';
import { ComandaModule } from './comanda/comanda.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { ItemPedidoModule } from './item-pedido/item-pedido.module';

@Module({
  imports: [UsuarioModule, ProdutoModule, MesaModule, ComandaModule, PedidosModule, ItemPedidoModule],
  controllers: [AppController, ProdutoController],
  providers: [AppService, ProdutoService],
})
export class AppModule {}
