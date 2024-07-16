# Desafio Nginx com Node.js e MySQL

Este projeto foi desenvolvido como parte de um desafio prático para aplicar conceitos de utilização do nginx como proxy reverso, integrando uma aplicação Node.js com um banco de dados MySQL.

## Funcionalidades Implementadas

🔹 Proxy Reverso com nginx: Configuração do nginx para encaminhar requisições para a aplicação Node.js.

🔹 Aplicação Node.js: Responsável por receber requisições do nginx, adicionar registros na tabela people do MySQL e retornar uma resposta formatada.

🔹 MySQL Database: Armazenamento dos nomes cadastrados na tabela people.

## Funcionamento

Quando um usuário acessa o servidor via nginx, o nginx encaminha a requisição para a aplicação Node.js. A aplicação Node.js adiciona um novo nome na tabela people do MySQL e retorna uma resposta com a mensagem "Full Cycle Rocks!" seguida pela lista de nomes cadastrados no banco de dados.

## Docker Compose
O projeto utiliza Docker Compose para facilitar a execução e o gerenciamento dos serviços. Ao executar o comando `docker-compose up -d`, os seguintes serviços serão inicializados:

🔹 Nginx: Configurado como proxy reverso para encaminhar requisições para a aplicação Node.js.

🔹 Node.js: Aplicação responsável por adicionar registros no banco de dados MySQL e fornecer a resposta formatada.

🔹 MySQL: Banco de dados utilizado para armazenar os nomes cadastrados na tabela people.

## Porta de Acesso
O serviço estará disponível na porta 8081 do seu localhost.

## Configuração Adicional
Para ambiente de desenvolvimento, um volume é configurado para facilitar a modificação e o teste do código da aplicação Node.js.

## Execução

🔹 Clone o repositório:

bash
Copiar código
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
Execute o Docker Compose:

Copiar código
docker-compose up -d
Acesse o aplicativo através do seu navegador em http://localhost:8080.

Contribuições
Contribuições são bem-vindas! Sinta-se à vontade para fazer um fork do projeto e enviar suas melhorias através de pull requests.


