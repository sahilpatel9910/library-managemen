const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const User = require('./user')(sequelize, Sequelize);

const db = {
  Sequelize,
  sequelize,
  User
};

module.exports = db;
