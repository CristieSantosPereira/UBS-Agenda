const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'database.sqlite'),
  logging: false,
});

async function connect() {
  try {
    await sequelize.authenticate();
    console.log('Banco conectado com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar no banco:', error);
  }
}

module.exports = { sequelize, connect };