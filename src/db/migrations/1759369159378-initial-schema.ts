import { MigrationInterface, QueryRunner } from "typeorm";
import { CategoriaProduto } from "../../produto/entities/produto.entity";
import * as bcrypt from 'bcrypt';
export class InitialSchema1759369159378 implements MigrationInterface {
    name = 'InitialSchema1759369159378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`produtos\` (\`id\` varchar(36) NOT NULL, \`nome\` varchar(200) NOT NULL, \`descricao\` text NULL, \`preco\` decimal(10,2) NOT NULL, \`categoria\` enum ('prato', 'bebida', 'sobremesa', 'entrada') NOT NULL DEFAULT 'prato', \`disponivel\` varchar(255) NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`mesa\` (\`id\` int NOT NULL AUTO_INCREMENT, \`numero\` int NOT NULL, UNIQUE INDEX \`IDX_905ff4a07c147aea02ed9f545b\` (\`numero\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`item_pedido\` (\`id\` varchar(36) NOT NULL, \`quantidade\` int NOT NULL, \`precoUnitario\` decimal(10,2) NOT NULL, \`observacao\` text NULL, \`id_pedido\` varchar(36) NULL, \`id_produto\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`pedidos\` (\`id\` varchar(36) NOT NULL, \`status\` enum ('recebido', 'em_preparo', 'pronto', 'cancelado') NOT NULL DEFAULT 'recebido', \`data_pedido\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`id_comanda\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comandas\` (\`id\` varchar(36) NOT NULL, \`status\` enum ('aberta', 'fechada', 'paga') NOT NULL DEFAULT 'aberta', \`data_abertura\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`id_mesa\` int NULL, \`id_usuario_garcom\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`usuario\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`nome\` varchar(255) NOT NULL, \`senha\` varchar(255) NOT NULL, \`role\` enum ('admin', 'garcom') NOT NULL DEFAULT 'admin', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`item_pedido\` ADD CONSTRAINT \`FK_b8a06a055ed50f426d61b625515\` FOREIGN KEY (\`id_pedido\`) REFERENCES \`pedidos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`item_pedido\` ADD CONSTRAINT \`FK_24b16ca61542e380e35a21303cd\` FOREIGN KEY (\`id_produto\`) REFERENCES \`produtos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pedidos\` ADD CONSTRAINT \`FK_20598bd724ddcb2dfbb89d04a55\` FOREIGN KEY (\`id_comanda\`) REFERENCES \`comandas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comandas\` ADD CONSTRAINT \`FK_30c16c1c05e589ab0bbd3a3b1b6\` FOREIGN KEY (\`id_mesa\`) REFERENCES \`mesa\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comandas\` ADD CONSTRAINT \`FK_830eb47725a1faf1cb2dd47ce35\` FOREIGN KEY (\`id_usuario_garcom\`) REFERENCES \`usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    
        const adminPassword = await bcrypt.hash('admin123', 10);
        const garcomPassword = await bcrypt.hash('garcom123', 10);

        await queryRunner.query(
            `INSERT INTO \`usuario\` (nome, email, senha, role) VALUES (?, ?, ?, ?), (?, ?, ?, ?)`,
            [
                'Administrador',
                'admin@pedeai.com',
                adminPassword,
                'admin',
                'Garçom Padrão',
                'garcom@pedeai.com',
                garcomPassword,
                'garcom',
            ]
        );


         const produtos = [
            // Pratos
            { nome: 'Moqueca Capixaba', descricao: 'Cozido de peixe fresco, tomate, coentro e urucum. Acompanha arroz, pirão e farofa.', preco: 115.00, categoria: CategoriaProduto.PRATO },
            { nome: 'Feijoada Completa', descricao: 'Cozido de feijão preto com carnes de porco. Servida com arroz, couve, farofa, torresmo e laranja.', preco: 70.00, categoria: CategoriaProduto.PRATO },
            { nome: 'Picanha na Chapa com Alho', descricao: 'Suculenta picanha grelhada com alho frito. Acompanha batata frita, arroz à grega, farofa e vinagrete.', preco: 95.00, categoria: CategoriaProduto.PRATO },
            { nome: 'Galinhada com Pequi', descricao: 'Arroz cremoso com frango em pedaços e o fruto do cerrado, pequi. Sabor e aroma únicos.', preco: 60.00, categoria: CategoriaProduto.PRATO },
            { nome: 'Bobó de Camarão', descricao: 'Creme aveludado de mandioca, leite de coco, azeite de dendê e camarões frescos. Servido com arroz.', preco: 88.00, categoria: CategoriaProduto.PRATO },
            { nome: 'Escondidinho de Carne Seca', descricao: 'Purê cremoso de mandioca gratinado com recheio generoso de carne seca desfiada e refogada.', preco: 52.00, categoria: CategoriaProduto.PRATO },
            { nome: 'Baião de Dois com Queijo Coalho', descricao: 'Arroz e feijão fradinho com carne seca, linguiça, bacon e pedaços de queijo coalho tostado.', preco: 48.00, categoria: CategoriaProduto.PRATO },
            { nome: 'Virado à Paulista', descricao: 'Bisteca de porco, tutu de feijão, arroz, couve, ovo frito e banana à milanesa.', preco: 65.00, categoria: CategoriaProduto.PRATO },
            { nome: 'Risoto de Funghi Secchi', descricao: 'Arroz arbóreo cozido lentamente em caldo de legumes com cogumelos funghi secchi e parmesão.', preco: 75.00, categoria: CategoriaProduto.PRATO },

            // Bebidas
            { nome: 'Caipirinha Tradicional', descricao: 'Cachaça de qualidade, limão taiti fresco, açúcar e gelo.', preco: 20.00, categoria: CategoriaProduto.BEBIDA },
            { nome: 'Suco de Abacaxi com Hortelã', descricao: 'Combinação clássica e extremamente refrescante da fruta com o frescor da hortelã.', preco: 14.00, categoria: CategoriaProduto.BEBIDA },
            { nome: 'Caldo de Cana', descricao: 'A popular garapa, extraída na hora da moagem da cana. Pode ser servida com limão ou abacaxi.', preco: 12.00, categoria: CategoriaProduto.BEBIDA },
            { nome: 'Cerveja Artesanal IPA', descricao: 'Uma India Pale Ale local, com amargor pronunciado e aromas cítricos e florais.', preco: 28.00, categoria: CategoriaProduto.BEBIDA },
            { nome: 'Água de Coco Natural', descricao: 'Servida diretamente do coco verde gelado, a bebida hidratante por excelência.', preco: 12.00, categoria: CategoriaProduto.BEBIDA },
            { nome: 'Suco de Cupuaçu', descricao: 'Feito com a polpa da fruta amazônica, de sabor exótico, que mistura acidez e notas de chocolate.', preco: 16.00, categoria: CategoriaProduto.BEBIDA },
            { nome: 'Quentão (Sazonal)', descricao: 'Cozido de cachaça ou vinho com gengibre, canela, cravo e açúcar. Servido quente.', preco: 14.00, categoria: CategoriaProduto.BEBIDA },
            { nome: 'Batida de Coco', descricao: 'Coquetel cremoso com cachaça, leite de coco e leite condensado, batidos com gelo.', preco: 23.00, categoria: CategoriaProduto.BEBIDA },
            { nome: 'Café Coado na Hora', descricao: 'Café brasileiro de grãos selecionados, moído e coado na hora.', preco: 10.00, categoria: CategoriaProduto.BEBIDA },

            // Sobremesas
            { nome: 'Pudim de Leite Condensado', descricao: 'Um clássico cremoso, coberto por uma calda de caramelo dourada e brilhante.', preco: 20.00, categoria: CategoriaProduto.SOBREMESA },
            { nome: 'Brigadeirão', descricao: 'Uma versão maior e mais cremosa do brigadeiro, com a consistência de um pudim de chocolate intenso.', preco: 23.00, categoria: CategoriaProduto.SOBREMESA },
            { nome: 'Mousse de Maracujá', descricao: 'Leve, aerado e com o equilíbrio perfeito entre o doce e o azedo da fruta.', preco: 21.00, categoria: CategoriaProduto.SOBREMESA },
            { nome: 'Açaí na Tigela', descricao: 'Polpa de açaí batida, servida como um creme denso com frutas frescas e granola.', preco: 28.00, categoria: CategoriaProduto.SOBREMESA },
            { nome: 'Romeu e Julieta', descricao: 'Combinação mineira de queijo minas fresco com uma fatia generosa de goiabada cascão.', preco: 20.00, categoria: CategoriaProduto.SOBREMESA },
            { nome: 'Cartola', descricao: 'Sobremesa típica de Pernambuco: banana frita na manteiga coberta com queijo coalho assado.', preco: 25.00, categoria: CategoriaProduto.SOBREMESA },
            { nome: 'Quindim', descricao: 'Iguaria brilhante e amarela, feita de gema de ovo, açúcar e coco ralado.', preco: 14.00, categoria: CategoriaProduto.SOBREMESA },
            { nome: 'Torta Holandesa', descricao: 'Base de biscoito, recheio cremoso de baunilha e cobertura de ganache de chocolate.', preco: 27.00, categoria: CategoriaProduto.SOBREMESA },
            { nome: 'Sagu com Creme', descricao: 'Bolinhas de sagu cozidas em vinho tinto com cravo e canela, servidas com creme de baunilha.', preco: 19.00, categoria: CategoriaProduto.SOBREMESA },
        ];

        for (const produto of produtos) {
            await queryRunner.query(
                `INSERT INTO \`produtos\` (nome, descricao, preco, categoria) VALUES (?, ?, ?, ?)`,
                [produto.nome, produto.descricao, produto.preco, produto.categoria]
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comandas\` DROP FOREIGN KEY \`FK_830eb47725a1faf1cb2dd47ce35\``);
        await queryRunner.query(`ALTER TABLE \`comandas\` DROP FOREIGN KEY \`FK_30c16c1c05e589ab0bbd3a3b1b6\``);
        await queryRunner.query(`ALTER TABLE \`pedidos\` DROP FOREIGN KEY \`FK_20598bd724ddcb2dfbb89d04a55\``);
        await queryRunner.query(`ALTER TABLE \`item_pedido\` DROP FOREIGN KEY \`FK_24b16ca61542e380e35a21303cd\``);
        await queryRunner.query(`ALTER TABLE \`item_pedido\` DROP FOREIGN KEY \`FK_b8a06a055ed50f426d61b625515\``);
        await queryRunner.query(`DROP TABLE \`usuario\``);
        await queryRunner.query(`DROP TABLE \`comandas\``);
        await queryRunner.query(`DROP TABLE \`pedidos\``);
        await queryRunner.query(`DROP TABLE \`item_pedido\``);
        await queryRunner.query(`DROP INDEX \`IDX_905ff4a07c147aea02ed9f545b\` ON \`mesa\``);
        await queryRunner.query(`DROP TABLE \`mesa\``);
        await queryRunner.query(`DROP TABLE \`produtos\``);
    }

}
