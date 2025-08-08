const db = require('../database');

class Consulta {
  static async criar(data, hora, medico, pacienteId) {
    const query = `
      INSERT INTO consultas (data, hora, medico, paciente_id)
      VALUES (?, ?, ?, ?)
    `;
    const params = [data, hora, medico, pacienteId];
    const result = await db.run(query, params);
    return result.lastID;
  }

  static async buscarPorId(id) {
    const query = `
      SELECT * FROM consultas
      WHERE id = ?
    `;
    const params = [id];
    const consulta = await db.get(query, params);
    return consulta;
  }

  static async buscarTodos() {
    const query = `
      SELECT * FROM consultas
    `;
    const consultas = await db.all(query);
    return consultas;
  }

  static async atualizar(id, data, hora, medico) {
    const query = `
      UPDATE consultas
      SET data = ?, hora = ?, medico = ?
      WHERE id = ?
    `;
    const params = [data, hora, medico, id];
    await db.run(query, params);
  }

  static async deletar(id) {
    const query = `
      DELETE FROM consultas
      WHERE id = ?
    `;
    const params = [id];
    await db.run(query, params);
  }
}

module.exports = Consulta;