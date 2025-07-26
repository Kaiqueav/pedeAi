import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../enums/role.enum";

@Entity('usuario')
export class Usuario{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    nome: string

    @Column()
    senha: string

    @Column({ type: 'enum', enum: Role, default: Role.ADMIN})
    role : Role
}