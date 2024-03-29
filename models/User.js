const { DataTypes } = require('sequelize');
const sequelize = require('../conf/sequelize');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.STRING
  },
});

module.exports = User;