import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { StatusPedido } from 'src/pedidos/entities/pedido.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  let createdProdutoId: string;
  let createdMesaId: number;
  let createdPedidoId: string;

  // Roda uma vez antes de todos os testes deste arquivo
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // Importante: Aplique os mesmos pipes globais que sua aplicação usa
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }));
    await app.init();
  });

  // Fecha a aplicação depois que todos os testes terminarem
  afterAll(async () => {
    await app.close();
  });

  it('Deve retornar "Hello World!" na rota raiz', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  // ---- Teste do Fluxo de Autenticação ----
  describe('Autenticação', () => {
    it('Deve autenticar o usuário admin e retornar um access_token', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'admin@pedeai.com', // Usuário admin criado no onModuleInit do UsuarioService
          senha: 'admin123',
        })
        .expect(201); // POST bem-sucedido retorna 201 por padrão no NestJS

      expect(response.body.access_token).toBeDefined();
      accessToken = response.body.access_token; // Salva o token para os próximos testes
    });
  });

  // ---- Teste do Fluxo de Pedidos (depende da autenticação) ----
  describe('Fluxo de Pedidos', () => {
    // Primeiro, precisamos de uma mesa e um produto para criar um pedido
    it('Deve criar um Produto (requer token de admin)', async () => {
      const produtoDto = {
        nome: 'Pizza Calabresa E2E',
        preco: 45.50,
        categoria: 'prato',
        descricao: 'Teste E2E',
      };

      const response = await request(app.getHttpServer())
        .post('/produto')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(produtoDto)
        .expect(201);
      
      expect(response.body.id).toBeDefined();
      createdProdutoId = response.body.id; // Salva o ID do produto
    });

    it('Deve criar uma Mesa (requer token)', async () => {
      const mesaDto = {
        numero: 999, // Um número de mesa que provavelmente não existe
      };

      const response = await request(app.getHttpServer())
        .post('/mesa')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(mesaDto)
        .expect(201);
      
      expect(response.body.id).toBeDefined();
      createdMesaId = response.body.id; // Salva o ID da mesa
    });

    // Agora, o teste principal de criação de pedido
    it('Deve criar um novo Pedido', async () => {
      const pedidoDto = {
        mesaId: createdMesaId,
        itens: [
          {
            produtoId: createdProdutoId,
            quantidade: 2,
            observacao: 'Sem cebola',
          },
        ],
      };

      const response = await request(app.getHttpServer())
        .post('/pedidos')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(pedidoDto)
        .expect(201);

      expect(response.body.id).toBeDefined();
      expect(response.body.status).toEqual(StatusPedido.RECEBIDO);
      expect(response.body.itensPedido).toHaveLength(1);
      expect(response.body.itensPedido[0].quantidade).toBe(2);
      createdPedidoId = response.body.id; // Salva o ID do pedido
    });

    // Teste de atualização de status
    it('Deve atualizar o status do pedido criado', async () => {
      const updateStatusDto = {
        status: StatusPedido.EM_PREPARO,
      };

      const response = await request(app.getHttpServer())
        .patch(`/pedidos/${createdPedidoId}/status`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(updateStatusDto)
        .expect(200);

      expect(response.body.id).toBe(createdPedidoId);
      expect(response.body.status).toEqual(StatusPedido.EM_PREPARO);
    });
  });
});