const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:SUA SENHA@localhost:5432/apipdfteste', {
    // logging: false, // Esconder os logs
    }
);

module.exports = sequelize;
