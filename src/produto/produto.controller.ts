import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dtos/create-produto.dto';
import { UpdateProdutoDto } from './dtos/update-produto.dto';

@Controller('produto')
export class ProdutoController {
    constructor (private readonly produtoService: ProdutoService){}

    @Post()
    create(@Body() createProdutoDto: CreateProdutoDto){
        return this.produtoService.create(createProdutoDto);
    }

    @Get()
    findAll(){
        return this.produtoService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: string){
        return this.produtoService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseUUIDPipe)id:string,
        @Body() updateProdutoDto: UpdateProdutoDto,
){
        return this.produtoService.update(id, updateProdutoDto)
}
@Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Define o status de sucesso para 204
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.produtoService.remove(id);
  }
}
