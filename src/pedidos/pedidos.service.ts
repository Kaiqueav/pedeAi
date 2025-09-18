import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido, StatusPedido } from './entities/pedido.entity';
import { In, Repository } from 'typeorm';
import { Produto } from 'src/produto/entities/produto.entity';
import { ComandaService } from 'src/comanda/comanda.service';
import { MesaService } from 'src/mesa/mesa.service';
import { ItemPedido } from 'src/pedidos/entities/item-pedido.entity';
import { UpdatePedidoStatusDto } from './dto/update-pedidos-status.dto';
import { EventsGateway } from 'src/events/events.gateway';

@Injectable()
export class PedidosService {
  eventsGateway: any;
  constructor(
    @InjectRepository(Pedido)
    private readonly  pedidoRepository: Repository<Pedido>,
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
    private readonly comandasService: ComandaService,
    private readonly mesaService: MesaService,
  ){}
  async create(createPedidoDto: CreatePedidoDto) {
    const mesa = await this.mesaService.findOne(createPedidoDto.mesaId);
    const comanda = await this.comandasService.findOrCreateComandaAberta(mesa);

    const idsDosProdutos = createPedidoDto.itens.map((item)=> item.produtoId);
    const produtosNoBanco = await this.produtoRepository.findBy({id: In(idsDosProdutos)});
//verificação de produto
    const produtosMap = new Map(produtosNoBanco.map((p)=> [p.id, p]))
    if(produtosMap.size!== idsDosProdutos.length){
      throw new NotFoundException('um dos produtos não foi achado')
    }
    const itensDoPedido: ItemPedido[]= [];
    for(const itemDto of createPedidoDto.itens){

      const produto = produtosMap.get(itemDto.produtoId);
//verificando se isso ta disponivel
      if(!produto.disponivel){
          throw new BadRequestException(`Produto${produto.nome} não esta disponivel`)
    }
     const itemPedido = new ItemPedido();
      itemPedido.produto = produto;
      itemPedido.quantidade = itemDto.quantidade;
      itemPedido.precoUnitario = produto.preco; 
      itemPedido.observacao = itemDto.observacao;
      itensDoPedido.push(itemPedido)
    
  }
  const novoPedido = this.pedidoRepository.create({
    comanda: comanda,
    itensPedido: itensDoPedido,
  });
  return this.pedidoRepository.save(novoPedido);
}

 async findAll(): Promise<Pedido[]> {
    return this.pedidoRepository.find({
      relations: ['comanda', 'comanda.mesa', 'itensPedido', 'itensPedido.produto'],
    });
  }

   async findOne(id: string): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({
      where: { id },
      relations: [
        'comanda',
        'comanda.mesa',
        'itensPedido',
        'itensPedido.produto',
      ],order:{
        dataPedido: 'ASC'
      }
    });

    if (!pedido) {
      throw new NotFoundException(`Pedido com ID #${id} não encontrado.`);
    }

    return pedido;
  }
 async updateStatus(
    id: string,
    updatePedidoStatusDto: UpdatePedidoStatusDto,
  ): Promise<Pedido> {
    const pedido = await this.findOne(id);
    pedido.status = updatePedidoStatusDto.status;
    
    
    const pedidoAtualizado = await this.pedidoRepository.save(pedido);

 
    this.eventsGateway.emitirAtualizacaoStatus(id, pedidoAtualizado);
    
    return pedidoAtualizado;
  }


  async cancel(id: string): Promise<Pedido> {
    const pedido = await this.findOne(id);

    if (pedido.status !== StatusPedido.RECEBIDO) {
      throw new BadRequestException(
        `Não é possível cancelar um pedido que já está com status "${pedido.status}"`,
      );
    }

    pedido.status = StatusPedido.CANCELADO;
    
 
    const pedidoCancelado = await this.pedidoRepository.save(pedido);
 
    this.eventsGateway.emitirAtualizacaoStatus(id, pedidoCancelado);

    return pedidoCancelado;
  }
}
