import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { MesaService } from './mesa.service';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';

@Controller('mesa')
export class MesaController {
  constructor(private readonly mesaService: MesaService) {}

  @Post()
  create(@Body() createMesaDto: CreateMesaDto) {
    return this.mesaService.create(createMesaDto);
  }

  @Get()
  findAll() {
    return this.mesaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mesaService.findOne(+id);
  }

  @Get('numero/:numero')
  findOneByNumero(@Param('numero', ParseIntPipe) numero: number) {
    return this.mesaService.findOneByNumero(numero);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMesaDto: UpdateMesaDto) {
    return this.mesaService.update(+id, updateMesaDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.mesaService.remove(+id);
  }
}
