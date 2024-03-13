const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:sys@dmin@localhost:5432/apipdfteste', {
    // logging: false, // Esconder os logs
    }
);

module.exports = sequelize;