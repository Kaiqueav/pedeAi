// src/produtos/produto.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // <-- Importante
import { Produto } from './entities/produto.entity'; 
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';

@Module({

  imports: [
    TypeOrmModule.forFeature([Produto]) 
  ],
  controllers: [ProdutoController],
  providers: [ProdutoService],
})
export class ProdutoModule {}