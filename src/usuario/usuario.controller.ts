import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dtos/Create-usuario.dto';
import { UpdateUsuarioDto } from './dtos/update-usuario.dto';

@Controller('usuario')
export class UsuarioController {
    constructor (
        private readonly usuarioService:UsuarioService,
    ){}

    @Post()
    create(@Body() createUsuarioDto: CreateUsuarioDto) {
        return this.usuarioService.create(createUsuarioDto);
    }
    @Get()
    findAll() {
        return this.usuarioService.findAll();
    }
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usuarioService.findOne(id);
    }

    @Patch(':id')
    update(
  @Param('id', ParseIntPipe) id: number,
  @Body() updateUsuarioDto: UpdateUsuarioDto,
    ){
    return this.usuarioService.update(id, updateUsuarioDto);
    }
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.remove(id);
    }
}
