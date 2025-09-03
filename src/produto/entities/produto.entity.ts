import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum CategoriaProduto{
    PRATO='prato',
    BEBIDA='bebida',
    SOBREMESA='sobremesa',
    ENTRADA='entrada'
}
@Entity({ name: 'produto'})
export class Produto{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type:'text',length:200})
    nome: string
    @Column({type:'text', nullable: true})
    descricao: string
    @Column({type:'decimal', precision: 10, scale:2})
    preco: number
    @Column({
    type: 'enum',
    enum: CategoriaProduto,
    default: CategoriaProduto.PRATO,
    })
  categoria: CategoriaProduto;
    @Column({default:true})
    disponivel: string
}