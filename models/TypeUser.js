const { DataTypes } = require('sequelize');
const sequelize = require('../conf/sequelize');

const TypeUser = sequelize.define('TypeUser', {
    type_user: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = TypeUser;