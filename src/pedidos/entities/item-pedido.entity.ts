import { Pedido } from "src/pedidos/entities/pedido.entity";
import { Produto } from "src/produto/entities/produto.entity";
import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class ItemPedido {
     @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantidade: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precoUnitario: number; // Preço do produto no momento do pedido

  @Column({ type: 'text', nullable: true })
  observacao: string;

  // Relação: Muitos itens podem pertencer a UM pedido
  @ManyToOne(() => Pedido, (pedido) => pedido.itensPedido)
  @JoinColumn({ name: 'id_pedido' })
  pedido: Pedido;

  // Relação: Muitos itens podem se referir a UM produto
  @ManyToOne(() => Produto, (produto) => produto.itensPedido)
  @JoinColumn({ name: 'id_produto' })
  produto: Produto;
}
