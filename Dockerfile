# ==========================================
# Estágio 1: Build da aplicação (Node.js)
# ==========================================
FROM node:22-alpine AS builder

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Instala o pnpm v9 (mesma versão da sua máquina) usando o npm padrão
RUN npm install -g pnpm@9

# Copia os arquivos de dependência primeiro (otimiza o cache do Docker)
COPY package.json pnpm-lock.yaml* ./

# Instala as dependências (agora sem a trava de idade!)
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