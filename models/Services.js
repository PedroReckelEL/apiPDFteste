const { DataTypes } = require('sequelize');
const sequelize = require('../conf/sequelize');

const Service = sequelize.define('Service', {
    service_name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Service;