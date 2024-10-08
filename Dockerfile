# Etapa 1: Build da aplicação
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Etapa 2: Container final para rodar a aplicação
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

RUN npm install --only=production

EXPOSE 3000

CMD ["node", "dist/app.js"]
