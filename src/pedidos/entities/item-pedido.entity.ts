import { Pedido } from "src/pedidos/entities/pedido.entity";
import { Produto } from "src/produto/entities/produto.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity({name: 'item_pedido'})
export class ItemPedido {
     @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantidade: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precoUnitario: number; // Preço do produto no momento do pedido

  @Column({ type: 'text', nullable: true })
  observacao: string;

  @ManyToOne(() => Pedido, (pedido) => pedido.itensPedido)
  @JoinColumn({ name: 'id_pedido' })
  pedido: Pedido;

  @ManyToOne(() => Produto, (produto) => produto.itensPedido)
  @JoinColumn({ name: 'id_produto' })
  produto: Produto;
}
