import { Comanda } from "src/comanda/entities/comanda.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'mesa'})
export class Mesa {
    @PrimaryGeneratedColumn()
    id:number;
    @Column({unique: true})
    numero:number;
    
    @OneToMany(()=> Comanda,(comanda)=> comanda.mesa)
    comandas: Comanda[];
}
