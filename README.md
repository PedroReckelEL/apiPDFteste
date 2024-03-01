# Rodar as aplicações

## Subir um container com o banco de dados Postgres: 

```bash
docker run --name meu-postgres-container -e POSTGRES_PASSWORD=minha_senha -p 5432:5432 -d postgres:13
```

### Entrar no container com o Postgres: 

Execute os comandos:

```bash
docker exec -it meu-postgres-container /bin/bash
```

```bash
psql -U postgres
```

## Subir a aplicação Node.js:

Faça as configurações necessárias como senha no arquivo sequelize.js:

```bash
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:SUA SENHA@localhost:5432/apipdfteste', {
    // logging: false, // Esconder os logs
    }
);

module.exports = sequelize;
```

Entre na pasta do projeto e execute os comandos:

```bash
npm i

npm start

```

OBS: Caso o Sequelize após iniciado o node.js não criar o banco de dados "apipdfteste" automaticamente, crie o mesmo com o comando CREATE DATABASE;
