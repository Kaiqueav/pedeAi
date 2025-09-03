import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import { Repository } from 'typeorm';
import { Mesa } from './entities/mesa.entity';

@Injectable()
export class MesaService {
  constructor( private readonly mesaRepository: Repository<Mesa>){}
  create(createMesaDto: CreateMesaDto) {
    const mesa = this.mesaRepository.create(createMesaDto);
    return this.mesaRepository.save(mesa);
  }

  findAll() {

    return this.mesaRepository.find();
  }

  async findOne(id: number): Promise<Mesa> {
    const mesa = await this.mesaRepository.findOneBy({id : id});

    if(!mesa){
      throw new NotFoundException(`essa mesa ${id} não existe`)
    }
    return mesa;
  }

  async update(id: number, updateMesaDto: UpdateMesaDto) {
    const mesa = await this.mesaRepository.preload({
      id:id,
      ...updateMesaDto
    })
    if(!mesa){
      throw new NotFoundException(`essa mesa ${id} não existe`)
    }
    return this.mesaRepository.save(mesa);
  }

  async remove(id: number): Promise<void> {
    const mesa = await this.findOne(id)
    await this.mesaRepository.remove(mesa)
  }
}
