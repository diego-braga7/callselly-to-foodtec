# Usar a imagem oficial do Node.js
FROM node:18

# Criar e definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar package.json e package-lock.json para o container
COPY package*.json ./

# Instalar dependências
RUN npm install --only=development

# Copiar o restante do código da aplicação
COPY . .

# Expor a porta que a aplicação vai rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]
