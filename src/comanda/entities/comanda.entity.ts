import { Mesa } from "src/mesa/entities/mesa.entity";
import { Pedido } from "src/pedidos/entities/pedido.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
export enum StatusComanda {
  ABERTA = 'aberta',
  FECHADA = 'fechada',
  PAGA = 'paga',
}

@Entity({name:'comandas'})
export class Comanda {
    @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: StatusComanda,
    default: StatusComanda.ABERTA,
  })
  status: StatusComanda;

  @CreateDateColumn({ name: 'data_abertura' })
  dataAbertura: Date;

  
  @ManyToOne(() => Mesa, (mesa) => mesa.comandas)
  @JoinColumn({ name: 'id_mesa' }) 
  mesa:Mesa;

  @ManyToOne(() => Usuario, (usuario) => usuario.comandas, { nullable: true })
  @JoinColumn({ name: 'id_usuario_garcom' }) // Define a coluna da chave estrangeira
  garcom: Usuario;

  // Relação: Uma comanda pode ter muitos pedidos
  @OneToMany(() => Pedido, (pedido) => pedido.comanda)
  pedidos: Pedido[];
  
}
