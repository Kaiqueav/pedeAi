import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ParseUUIDPipe, HttpStatus } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { UpdatePedidoStatusDto } from './dto/update-pedidos-status.dto';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  create(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidosService.create(createPedidoDto);
  }

  @Get()
  findAll() {
    return this.pedidosService.findAll();
  }

    @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.pedidosService.findOne(id);
  }

 
  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePedidoStatusDto: UpdatePedidoStatusDto,
  ) {
    return this.pedidosService.updateStatus(id, updatePedidoStatusDto);
  }

  
  @Delete(':id')
  @HttpCode(HttpStatus.OK) 
  cancel(@Param('id', ParseUUIDPipe) id: string) {
    return this.pedidosService.cancel(id);
  }
}
