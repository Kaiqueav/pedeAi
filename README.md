# Gestão de Mesas com QR Code - API

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

API RESTful robusta para um sistema de pedidos de restaurante via QR Code, construída com NestJS, TypeScript e TypeORM, e totalmente containerizada com Docker.

## 📋 Sobre o Projeto

Este projeto é o backend de um sistema completo que permite aos clientes de um restaurante visualizarem o cardápio e fazerem pedidos diretamente de seus celulares, escaneando um QR Code na mesa. A API gerencia toda a lógica de negócio, desde o cadastro de produtos e usuários até o fluxo transacional complexo de comandas e pedidos.

---

## ✨ Principais Funcionalidades

* **Gerenciamento de Usuários:** Sistema de CRUD para usuários com diferentes papéis (Admin, Garçom) e senhas criptografadas.
* **Gerenciamento de Cardápio:** CRUD completo para Produtos, organizados por categoria.
* **Fluxo de Pedidos:** Lógica transacional para criação de pedidos, associando-os a uma mesa e a uma comanda.
* **Gestão de Comandas:** Criação automática e gerenciamento do ciclo de vida da "conta" da mesa.
* **Segurança:** Validação de dados de entrada (DTOs) e preparação para autenticação via JWT.
* **Containerização:** Ambiente de desenvolvimento e produção totalmente gerenciado por Docker e Docker Compose.

---

## 🚀 Tecnologias Utilizadas

* **Backend:** [NestJS](https://nestjs.com/)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **ORM:** [TypeORM](https://typeorm.io/)
* **Banco de Dados:** [MySQL](https://www.mysql.com/)
* **Containerização:** [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
* **Validação:** [class-validator](https://github.com/typestack/class-validator) & [class-transformer](https://github.com/typestack/class-transformer)

---

## 🏁 Como Rodar o Projeto

A maneira mais fácil e recomendada de rodar o projeto é utilizando Docker.

### Pré-requisitos

* [Node.js](https://nodejs.org/en/) (v18+)
* [Docker](https://www.docker.com/get-started) e Docker Compose
* [Git](https://git-scm.com/)

### Instalação

1.  **Clone o repositório**
    ```bash
    git clone https://github.com/Kaiqueav/pedeAi.git
    cd pedeAi
    ```

2.  **Crie o arquivo de variáveis de ambiente**
    Crie uma cópia do arquivo `.env.example` (se você tiver um) ou crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo. **Use uma senha forte!**
    ```dotenv
    # Variáveis de Ambiente para a API
    DB_HOST=db
    DB_TYPE=mysql
    DB_PORT=3306
    DB_USERNAME=root
    DB_PASSWORD=sua_senha_forte
    DB_DATABASE=gestao_mesas
    ```

### Executando com Docker

Com o Docker e o Docker Compose instalados, basta um único comando para subir toda a aplicação (API + Banco de Dados).

```bash
docker-compose up --build
```

A API estará disponível em `http://localhost:3000`. O banco de dados estará acessível em `localhost:3306`.

### Executando Localmente (Sem Docker)

1.  Garanta que você tenha uma instância do MySQL rodando localmente.
2.  Ajuste as variáveis no arquivo `.env` para conectar ao seu banco local (o `DB_HOST` provavelmente será `localhost`).
3.  Instale as dependências:
    ```bash
    npm install
    ```
4.  Rode a aplicação em modo de desenvolvimento:
    ```bash
    npm run start:dev
    ```

---

## 📝 Endpoints da API (Principais)

| Método | URL                     | Descrição                                         |
| :----- | :---------------------- | :-------------------------------------------------- |
| `POST` | `/usuarios`             | Cria um novo usuário.                               |
| `GET`  | `/usuarios`             | Lista todos os usuários.                            |
| `POST` | `/produtos`             | Cria um novo produto no cardápio.                   |
| `GET`  | `/produtos`             | Lista todos os produtos.                            |
| `GET`  | `/mesas`                | Lista todas as mesas.                               |
| `GET`  | `/comandas/:id`         | Retorna os detalhes e o total de uma comanda.       |
| `PATCH`| `/comandas/:id`         | Atualiza o status de uma comanda (ex: fechar conta).|
| `POST` | `/pedidos`              | **Cria um novo pedido para uma mesa.** |
| `GET`  | `/pedidos`              | Lista todos os pedidos.                             |
| `PATCH`| `/pedidos/:id/status`   | Atualiza o status de um pedido (pela cozinha).      |

---

## 👨‍💻 Autor

**Kaique Cerqueira Lopes**

* LinkedIn: `https://www.linkedin.com/in/kaique-cerqueira-bb3016272/`
* GitHub: `https://github.com/Kaiqueav`

---

