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

# Copiar o script de inicialização
COPY entrypoint.sh .

# Dar permissão de execução para o script
RUN chmod +x entrypoint.sh

# Expor a porta que a aplicação vai rodar
EXPOSE 3000

# Definir o script como ponto de entrada
ENTRYPOINT ["./entrypoint.sh"]
