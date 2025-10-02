
FROM node:20-alpine AS builder

WORKDIR /usr/src/app


COPY package*.json ./
RUN npm install


COPY . .

RUN npm run build


FROM node:20-alpine

WORKDIR /usr/src/app


COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./

CMD npm run migration:run && npm run start:prod