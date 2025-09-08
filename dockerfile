# Estágio 1: Builder - Onde instalamos tudo e compilamos o projeto
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Copia os arquivos de dependência e instala
COPY package*.json ./
RUN npm install

# Copia todo o resto do código-fonte
COPY . .

# Compila o TypeScript para JavaScript
RUN npm run build

# ---
# Estágio 2: Production - A imagem final, leve e pronta para rodar
FROM node:18-alpine

WORKDIR /usr/src/app

# Copia apenas os artefatos compilados e as dependências de produção do estágio 'builder'
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./

# Comando para iniciar a aplicação
CMD ["node", "dist/main"]