# ==========================================
# Estágio 1: Build da aplicação (Node.js)
# ==========================================
FROM node:22-alpine AS builder

# Habilita o corepack para podermos usar a versão exata do pnpm do package.json
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependência primeiro (otimiza o cache do Docker)
COPY package.json pnpm-lock.yaml* ./

# Instala as dependências
RUN pnpm install --frozen-lockfile

# Copia o restante dos arquivos do projeto
COPY . .

# Roda o comando de build do Vite (gera a pasta /dist)
RUN pnpm run build

# ==========================================
# Estágio 2: Servidor de Produção (Nginx)
# ==========================================
FROM nginx:alpine

# Remove os arquivos padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos compilados do Estágio 1 para o Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia o nosso arquivo de configuração customizado
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80 do container
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]