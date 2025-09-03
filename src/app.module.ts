import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { ProdutoController } from './produto/produto.controller';
import { ProdutoService } from './produto/produto.service';
import { ProdutoModule } from './produto/produto.module';

@Module({
  imports: [UsuarioModule, ProdutoModule],
  controllers: [AppController, ProdutoController],
  providers: [AppService, ProdutoService],
})
export class AppModule {}
