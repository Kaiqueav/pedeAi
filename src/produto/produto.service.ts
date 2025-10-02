import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { Repository } from 'typeorm';
import { CreateProdutoDto } from './dtos/create-produto.dto';
import { UpdateProdutoDto } from './dtos/update-produto.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { off } from 'process';

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

  findAll(paginationDto: PaginationDto):Promise<Produto[]>{
    const{ limit, offset} = paginationDto
    return this.produtoRepository.find({
      take: limit,
      skip: offset,
    });
  }
  async findOne(id:string): Promise<Produto>{

    const produto = this.produtoRepository.findOneBy({id})
    if (!produto) {
      throw new NotFoundException(`produto não encontrado ${id}`)
    }
    return produto;
  }
  async update (id:string, updateProdutoDto: UpdateProdutoDto): Promise<Produto>{
    const produto = await this.produtoRepository.preload({
      id: id,
      ...updateProdutoDto
    })
    if(!produto){
      throw new NotFoundException(`produto não encontrado${id}`)
    }
    return this.produtoRepository.save(produto)
  }
async remove(id: string):Promise<void>{
  const produto = await this.findOne(id);
  await this.produtoRepository.remove(produto);
}}


