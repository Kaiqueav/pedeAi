import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateComandaDto } from './dto/update-comanda.dto';
import { Not, Repository } from 'typeorm';
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
  async findOne(id: string): Promise<Comanda &{ total: number}>{
      const comanda = await this.comandaRepository.findOne({
        where:{id},
        relations:[
          'mesa',
          'garcom',
          'pedidos.itensPedido',
          'pedidos.itensPedido.produto'
        ],
      });
      if(!comanda){
        throw new NotFoundException(`Comanda com o id ${id} não encontrada`)
      }
    //calculando valor da comanda
    return `This action returns a #${id} comanda`;
  }

  update(id: number, updateComandaDto: UpdateComandaDto) {
    return `This action updates a #${id} comanda`;
  }

  remove(id: number) {
    return `This action removes a #${id} comanda`;
  }
}
