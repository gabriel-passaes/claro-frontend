# --- Build ---
FROM node:18-alpine AS builder

WORKDIR /app

# Instala pnpm globalmente
RUN npm install -g pnpm

# Copia arquivos de dependência
COPY package.json pnpm-lock.yaml ./

# Instala dependências com cache travado
RUN pnpm install --frozen-lockfile

# Copia o restante do código
COPY . .

# Builda o projeto Next.js
RUN pnpm build

# --- Produção ---
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

# Instala pnpm globalmente (necessário para o start funcionar)
RUN npm install -g pnpm

# Copia apenas o necessário do builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3001

CMD ["pnpm", "start", "-p", "3001"]
