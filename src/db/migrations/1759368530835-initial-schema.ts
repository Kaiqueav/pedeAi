import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1759368530835 implements MigrationInterface {
    name = 'InitialSchema1759368530835'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`produtos\` (\`id\` varchar(36) NOT NULL, \`nome\` varchar(200) NOT NULL, \`descricao\` text NULL, \`preco\` decimal(10,2) NOT NULL, \`categoria\` enum ('prato', 'bebida', 'sobremesa', 'entrada') NOT NULL DEFAULT 'prato', \`disponivel\` varchar(255) NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`mesa\` (\`id\` int NOT NULL AUTO_INCREMENT, \`numero\` int NOT NULL, UNIQUE INDEX \`IDX_905ff4a07c147aea02ed9f545b\` (\`numero\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`usuario\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`nome\` varchar(255) NOT NULL, \`senha\` varchar(255) NOT NULL, \`role\` enum ('admin', 'garcom') NOT NULL DEFAULT 'admin', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comandas\` (\`id\` varchar(36) NOT NULL, \`status\` enum ('aberta', 'fechada', 'paga') NOT NULL DEFAULT 'aberta', \`data_abertura\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`id_mesa\` int NULL, \`id_usuario_garcom\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`item_pedido\` (\`id\` varchar(36) NOT NULL, \`quantidade\` int NOT NULL, \`precoUnitario\` decimal(10,2) NOT NULL, \`observacao\` text NULL, \`id_pedido\` varchar(36) NULL, \`id_produto\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`pedidos\` (\`id\` varchar(36) NOT NULL, \`status\` enum ('recebido', 'em_preparo', 'pronto', 'cancelado') NOT NULL DEFAULT 'recebido', \`data_pedido\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`id_comanda\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`comandas\` ADD CONSTRAINT \`FK_30c16c1c05e589ab0bbd3a3b1b6\` FOREIGN KEY (\`id_mesa\`) REFERENCES \`mesa\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comandas\` ADD CONSTRAINT \`FK_830eb47725a1faf1cb2dd47ce35\` FOREIGN KEY (\`id_usuario_garcom\`) REFERENCES \`usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`item_pedido\` ADD CONSTRAINT \`FK_b8a06a055ed50f426d61b625515\` FOREIGN KEY (\`id_pedido\`) REFERENCES \`pedidos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`item_pedido\` ADD CONSTRAINT \`FK_24b16ca61542e380e35a21303cd\` FOREIGN KEY (\`id_produto\`) REFERENCES \`produtos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pedidos\` ADD CONSTRAINT \`FK_20598bd724ddcb2dfbb89d04a55\` FOREIGN KEY (\`id_comanda\`) REFERENCES \`comandas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pedidos\` DROP FOREIGN KEY \`FK_20598bd724ddcb2dfbb89d04a55\``);
        await queryRunner.query(`ALTER TABLE \`item_pedido\` DROP FOREIGN KEY \`FK_24b16ca61542e380e35a21303cd\``);
        await queryRunner.query(`ALTER TABLE \`item_pedido\` DROP FOREIGN KEY \`FK_b8a06a055ed50f426d61b625515\``);
        await queryRunner.query(`ALTER TABLE \`comandas\` DROP FOREIGN KEY \`FK_830eb47725a1faf1cb2dd47ce35\``);
        await queryRunner.query(`ALTER TABLE \`comandas\` DROP FOREIGN KEY \`FK_30c16c1c05e589ab0bbd3a3b1b6\``);
        await queryRunner.query(`DROP TABLE \`pedidos\``);
        await queryRunner.query(`DROP TABLE \`item_pedido\``);
        await queryRunner.query(`DROP TABLE \`comandas\``);
        await queryRunner.query(`DROP TABLE \`usuario\``);
        await queryRunner.query(`DROP INDEX \`IDX_905ff4a07c147aea02ed9f545b\` ON \`mesa\``);
        await queryRunner.query(`DROP TABLE \`mesa\``);
        await queryRunner.query(`DROP TABLE \`produtos\``);
    }

}
