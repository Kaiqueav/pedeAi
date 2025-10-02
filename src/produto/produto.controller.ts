import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dtos/create-produto.dto';
import { UpdateProdutoDto } from './dtos/update-produto.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/usuario/enums/role.enum';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('produto')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProdutoController {
    constructor (private readonly produtoService: ProdutoService){}

    @Post()
    @Roles(Role.ADMIN)
    create(@Body() createProdutoDto: CreateProdutoDto){
        return this.produtoService.create(createProdutoDto);
    }

    @Get()
    findAll(@Query() paginationDto:PaginationDto){
        return this.produtoService.findAll(paginationDto);
    }
    @Get(':id')
    findOne(@Param('id') id: string){
        return this.produtoService.findOne(id);
    }

    @Patch(':id')
    @Roles(Role.ADMIN) 
    update(
        @Param('id', ParseUUIDPipe)id:string,
        @Body() updateProdutoDto: UpdateProdutoDto,
){
        return this.produtoService.update(id, updateProdutoDto)
}
@Delete(':id')
@Roles(Role.ADMIN) 
  @HttpCode(HttpStatus.NO_CONTENT) // Define o status de sucesso para 204
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.produtoService.remove(id);
  }
}
