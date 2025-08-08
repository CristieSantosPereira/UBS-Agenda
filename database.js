// database.js
const sequelize = require('./config/database');

// Importa os modelos para inicializar
require('./models/paciente');
require('./models/consulta');

async function connect() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco SQLite estabelecida com sucesso.');

    // Sincroniza os modelos (cria tabelas se não existirem)
    await sequelize.sync();
    console.log('Modelos sincronizados no banco.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco:', error);
  }
}

module.exports = { sequelize, connect };
