# backend/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install --only=production

COPY . .
# Se usar Prisma, precisa gerar o client
RUN npx prisma generate

# Se precisar de build steps (ex: TypeScript)
# RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
# Copiar o código compilado ou o fonte direto
COPY --from=builder /app/src ./src
COPY --from=builder /app/prisma ./prisma # Inclui o schema e client gerado
# Copiar outros arquivos necessários (.env.example talvez?)

EXPOSE 3001 # Porta que o backend vai rodar
CMD ["node", "src/server.js"]