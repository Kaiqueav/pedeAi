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
 async findAll(): Promise<Comanda[]> {
    return this.comandaRepository.find({
      relations: ['mesa'], // Carrega a mesa junto para sabermos a qual mesa pertence
    });
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
    const total = comanda.pedidos.reduce((acc,pedido)=>{
      const totalPedido = pedido.itensPedido.reduce(
        (subAcc, item)=> subAcc + item.quantidade*+item.precoUnitario,
        0
      );
      return acc + totalPedido;
    }, 0)
    return{ ...comanda,total: parseFloat(total.toFixed(2)) };
  }

 async update(id: string, updateComandaDto: UpdateComandaDto):Promise<Comanda> {
  const comanda = await this.comandaRepository.preload({
    id,
    ...updateComandaDto
  })
  if(!comanda){
    throw new NotFoundException(`comanda com o id ${id} não localizada`)

  }

    return this.comandaRepository.save(comanda);
  }

  async remove(id: string):Promise<void> {
    const comanda = await this.findOne(id)
    await this.comandaRepository.remove(comanda);
  }
}
