const db = require('../database'); // Ajuste para '../config/database' se usar Sequelize

class Consulta {
  static async criar(data, hora, medico, pacienteId) {
    try {
      const query = `
        INSERT INTO consultas (data, hora, medico, paciente_id)
        VALUES (?, ?, ?, ?)
      `;
      const params = [data, hora, medico, pacienteId];
      const result = await db.run(query, params);
      return result.lastID;
    } catch (error) {
      throw new Error('Erro ao criar consulta: ' + error.message);
    }
  }

  static async buscarPorId(id) {
    try {
      const query = `
        SELECT * FROM consultas
        WHERE id = ?
      `;
      const params = [id];
      const consulta = await db.get(query, params);
      return consulta;
    } catch (error) {
      throw new Error('Erro ao buscar consulta: ' + error.message);
    }
  }

  static async buscarTodos() {
    try {
      const query = `
        SELECT * FROM consultas
      `;
      const consultas = await db.all(query);
      return consultas;
    } catch (error) {
      throw new Error('Erro ao buscar consultas: ' + error.message);
    }
  }

  static async atualizar(id, data, hora, medico) {
    try {
      const query = `
        UPDATE consultas
        SET data = ?, hora = ?, medico = ?
        WHERE id = ?
      `;
      const params = [data, hora, medico, id];
      const result = await db.run(query, params);
      return result.changes; // Retorna número de linhas afetadas
    } catch (error) {
      throw new Error('Erro ao atualizar consulta: ' + error.message);
    }
  }

  static async deletar(id) {
    try {
      const query = `
        DELETE FROM consultas
        WHERE id = ?
      `;
      const params = [id];
      const result = await db.run(query, params);
      return result.changes; // Retorna número de linhas afetadas
    } catch (error) {
      throw new Error('Erro ao deletar consulta: ' + error.message);
    }
  }
}

module.exports = Consulta;