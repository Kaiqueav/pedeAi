import { MigrationInterface, QueryRunner } from "typeorm";
import { Role } from "../../usuario/enums/role.enum"; 
import * as bcrypt from 'bcrypt'; 


export class SeedUsers1678889990000 implements MigrationInterface {
    
    
    name = 'SeedUsers1678889990000'


    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Criptografa as senhas antes de salvar. NUNCA salve senhas em texto plano.
        const adminPassword = await bcrypt.hash('admin123', 10);
        const garcomPassword = await bcrypt.hash('garcom123', 10);


        await queryRunner.query(
            `INSERT INTO usuario (nome, email, senha, role) VALUES (?, ?, ?, ?), (?, ?, ?, ?)`,
            [
                
                'Administrador',
                'admin@pedeai.com',
                adminPassword,
                Role.ADMIN, 

             
                'Garçom Padrão',
                'garcom@pedeai.com',
                garcomPassword,
                Role.GARCOM,
            ]
        );
    }

 
    public async down(queryRunner: QueryRunner): Promise<void> {
       
        await queryRunner.query(
            `DELETE FROM usuario WHERE email IN (?, ?)`,
            ['admin@pedeai.com', 'garcom@pedeai.com']
        );
    }
}