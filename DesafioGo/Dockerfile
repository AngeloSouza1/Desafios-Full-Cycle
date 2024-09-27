
# Usar uma imagem base mínima
FROM golang:alpine AS builder

# Criar o diretório de trabalho
WORKDIR /app

# Copiar o arquivo de módulo Go
COPY go.mod ./

# Baixar dependências
RUN go mod download

# Copiar o restante do código fonte
COPY . .

# Compilar o binário
RUN go build -o fullcycle

# Segunda etapa: usar uma imagem mínima para o binário compilado
FROM scratch

# Copiar o binário compilado da etapa anterior
COPY --from=builder /app/fullcycle /fullcycle

# Definir o comando de entrada
CMD ["/fullcycle"]

# Use the latest official Nginx image from the Docker Hub
FROM nginx:latest

# Copy the content of the html directory to the default Nginx HTML directory
COPY html /usr/share/nginx/html

# Define the entrypoint script and the default command to run Nginx in the foreground
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]


