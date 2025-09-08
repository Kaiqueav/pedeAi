import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "../enums/role.enum";
import { Comanda } from "src/comanda/entities/comanda.entity";
import * as bcrypt from 'bcrypt';

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
    @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relação: Um usuário (garçom) pode ter muitas comandas
  @OneToMany(() => Comanda, (comanda) => comanda.garcom)
  comandas: Comanda[];

  @BeforeInsert()
  async hashPassword() {
    this.senha = await bcrypt.hash(this.senha, 10);
  }
}