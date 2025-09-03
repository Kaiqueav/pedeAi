import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { Repository } from 'typeorm';
import { CreateProdutoDto } from './dtos/create-produto.dto';

@Injectable()
export class ProdutoService {

   constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
  ) {}


  create(createProdutoDto: CreateProdutoDto): Promise<Produto> {
    const produto = this.produtoRepository.create(createProdutoDto);
    return this.produtoRepository.save(produto);
  }

  findAll():Promise<Produto[]>{
    return this.produtoRepository.find();
  }
  async findOne(id:string): Promise<Produto>{

    const produto = this.produtoRepository.findOneBy({id})
    if (!produto) {
      throw new NotFoundException(`produto não encontrado ${id}`)
    }
    return produto
  }
}
