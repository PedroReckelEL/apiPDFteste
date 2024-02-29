const { DataTypes } = require('sequelize');
const sequelize = require('../conf/sequelize');

const User = sequelize.define('User', {
  username: {
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
  phone: {
    type: DataTypes.STRING,
    validate: {
      is: /^\+(?:[0-9] ?){6,14}[0-9]$/,
    },
  },
});

module.exports = User;
