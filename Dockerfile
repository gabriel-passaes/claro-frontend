FROM node:18-alpine

WORKDIR /app

# Instala pnpm globalmente
RUN npm install -g pnpm

# Copia arquivos de dependência
COPY package.json pnpm-lock.yaml ./

# Instala dependências incluindo devDependencies
RUN NODE_ENV=development pnpm install --frozen-lockfile

# Copia o restante do projeto
COPY . .

# Expõe a porta usada pelo app
EXPOSE 3001

# Comando de inicialização
CMD ["pnpm", "dev", "-p", "3001"]
