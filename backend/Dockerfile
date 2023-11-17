FROM node:18.15.0 AS backend

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o arquivo package.json para o diretório de trabalho
COPY package*.json .
COPY pnpm*.yaml .

# generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# Copia todo o conteúdo do diretório atual para o diretório de trabalho no contêiner
COPY . .
# Instala o pnpm globalmente
RUN npm install -g pnpm

# Instala as dependências usando pnpm
RUN pnpm i

# Define a porta do contêiner para 3000
EXPOSE 3333

# Comando para rodar o servidor de desenvolvimento
CMD /bin/sh -c "pnpm prisma db push  && pnpm dev"
