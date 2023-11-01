# Usa a imagem do Node 18.15.0 como base
FROM node:18.15.0 AS frontend

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o arquivo package.json para o diretório de trabalho
COPY package.json .

# Instala o pnpm globalmente
RUN npm install -g pnpm

# Instala as dependências usando pnpm
RUN pnpm install

# Copia todo o conteúdo do diretório atual para o diretório de trabalho no contêiner
COPY . .

# Define a porta do contêiner para 3000
EXPOSE 3000

# Define a variável de ambiente VITE_BACKEND_PORT como 3333
ENV VITE_BACKEND_PORT=3333

# Comando para rodar o servidor de desenvolvimento
CMD ["pnpm", "dev"]
