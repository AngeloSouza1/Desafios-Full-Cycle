# Fullcycle Docker Challenge

Este projeto implementa uma imagem Docker minimalista para o desafio Fullcycle, onde o objetivo é exibir a mensagem "Full Cycle Rocks!!".

## Requisitos

🔹 Docker instalado na máquina local.

## Como Usar

### Construir a Imagem Docker

🔹 Clone este repositório e navegue até o diretório do projeto DesafioGO

🔹 Construa a imagem Docker usando o Dockerfile fornecido:

```bash
docker build -t aafs1981/fullcycle .
```

### Executar o Contêiner Docker

🔹 Para executar o contêiner e ver a mensagem "Full Cycle Rocks!!":

```bash
docker run aafs1981/fullcycle
```
##### Isso exibirá a mensagem no console.

## Detalhes Técnicos

🔹 A imagem Docker foi construída a partir da imagem oficial do Golang Alpine para minimizar o tamanho.

🔹 O binário compilado ocupa menos de 2 megabytes para atender aos requisitos do desafio.

🔹 Segue o link da imagem no DockerHub : [docker pull aafs1981/fullcycle](https://hub.docker.com/r/aafs1981/fullcycle)

```bash
docker pull aafs1981/fullcycle
```

## Autor
Nome: Angelo Souza

