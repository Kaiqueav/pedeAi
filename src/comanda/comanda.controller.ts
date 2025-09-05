import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ComandaService } from './comanda.service';

import { UpdateComandaDto } from './dto/update-comanda.dto';

@Controller('comanda')
export class ComandaController {
  constructor(private readonly comandaService: ComandaService) {}

 

  @Get()
  findAll() {
    return this.comandaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.comandaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComandaDto: UpdateComandaDto) {
    return this.comandaService.update(id, updateComandaDto);
  }

 
}
