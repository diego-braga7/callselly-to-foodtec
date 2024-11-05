#!/bin/bash

# Instalar dependências (caso ainda não estejam instaladas)
npm install

# Compilar TypeScript para JavaScript
npx tsc

# Executar as migrations
npx typeorm migration:run -d dist/data-source.js

# Iniciar a aplicação
npm run dev
