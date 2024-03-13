const { DataTypes } = require('sequelize');
const sequelize = require('../conf/sequelize');

const UserInstace = sequelize.define('UserInstace', {
  remoteJid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pushName: {
    type: DataTypes.STRING,
  },
  instanceName: {
    type: DataTypes.STRING
  },
});

module.exports = UserInstace;