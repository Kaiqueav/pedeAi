import { Injectable } from '@nestjs/common';
import { UpdateComandaDto } from './dto/update-comanda.dto';
import { Repository } from 'typeorm';
import { Comanda, StatusComanda } from './entities/comanda.entity';
import { MesaService } from 'src/mesa/mesa.service';
import { Mesa } from 'src/mesa/entities/mesa.entity';

@Injectable()
export class ComandaService {
  constructor(
    private readonly comandaRepository: Repository<Comanda>,
    
  ){}

  async findOrCreateComandaAberta(mesa:Mesa): Promise<Comanda> {
   const comandaAberta = await this.comandaRepository.findOne({
    where:{
    mesa: {id: mesa.id},
    status: StatusComanda.ABERTA
   }
   });
   if(comandaAberta){
    return comandaAberta
   }
   const novaComanda = this.comandaRepository.create({
    mesa:mesa,
    status: StatusComanda.ABERTA,
   });
   return this.comandaRepository.save(novaComanda);
  }

//buscando uma comanda especifica viu
  async findOne(id: string) {
    
    return `This action returns a #${id} comanda`;
  }

  update(id: number, updateComandaDto: UpdateComandaDto) {
    return `This action updates a #${id} comanda`;
  }

  remove(id: number) {
    return `This action removes a #${id} comanda`;
  }
}
