const { DataTypes } = require('sequelize');
const sequelize = require('../conf/sequelize');

const Usuario = sequelize.define('Usuario', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
});

module.exports = Usuario;