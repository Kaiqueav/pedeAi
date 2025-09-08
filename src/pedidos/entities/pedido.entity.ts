import { Comanda } from "src/comanda/entities/comanda.entity";
import { ItemPedido } from "src/pedidos/entities/item-pedido.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum StatusPedido {
  RECEBIDO = 'recebido',
  EM_PREPARO = 'em_preparo',
  PRONTO = 'pronto',
  CANCELADO = 'cancelado',
}

@Entity({name: 'pedidos'})
export class Pedido {
     @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: StatusPedido,
    default: StatusPedido.RECEBIDO,
  })
  status: StatusPedido;

  @CreateDateColumn({ name: 'data_pedido' })
  dataPedido: Date;

  // Relação: Muitos pedidos podem pertencer a UMA comanda
  @ManyToOne(() => Comanda, (comanda) => comanda.pedidos)
  @JoinColumn({ name: 'id_comanda' })
  comanda: Comanda;

  // Relação: Um pedido pode ter muitos itens
  @OneToMany(() => ItemPedido, (item) => item.pedido, { cascade: true })
  itensPedido: ItemPedido[];
}
