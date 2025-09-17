import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import { Repository } from 'typeorm';
import { Mesa } from './entities/mesa.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MesaService {
  constructor( 
    @InjectRepository(Mesa)
    private readonly mesaRepository: Repository<Mesa>){}
  async create(createMesaDto: CreateMesaDto) {
    try {
      const mesa = this.mesaRepository.create(createMesaDto);
      return await this.mesaRepository.save(mesa);
    } catch (error) {
      // 2. Verifique se o erro é de entrada duplicada (código 23505 para Postgres, 1062 para MySQL)
      if (error.code === 'ER_DUP_ENTRY' || error.code === '23505') {
        throw new ConflictException(`A mesa com o número ${createMesaDto.numero} já existe.`);
      }
      // 3. Se for outro tipo de erro, lance um erro genérico
      throw error;
    }
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
  async findOneByNumero(numero: number): Promise<Mesa> {
    const mesa = await this.mesaRepository.findOneBy({ numero: numero });
    if (!mesa) {
      throw new NotFoundException(`A mesa com o número ${numero} não foi encontrada.`);
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
