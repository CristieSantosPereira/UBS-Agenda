const db = require('../database');

class Consulta {

  // ✅ CRIAR CONSULTA (ESSENCIAL)
  static async criar(data, hora, medico, pacienteId, observacoes = '') {
    try {
      const query = `
        INSERT INTO consultas (data, hora, medico, pacienteId, observacoes)
        VALUES (?, ?, ?, ?, ?)
      `;

      const params = [data, hora, medico, pacienteId, observacoes];

      const result = await db.run(query, params);

      return result.lastID;

    } catch (error) {
      throw new Error('Erro ao criar consulta: ' + error.message);
    }
  }

  // ✅ Buscar por ID
  static async buscarPorId(id) {
    try {
      const query = `SELECT * FROM consultas WHERE id = ?`;
      return await db.get(query, [id]);
    } catch (error) {
      throw new Error('Erro ao buscar consulta: ' + error.message);
    }
  }

  // ✅ Buscar todas
  static async buscarTodos() {
    try {
      return await db.all(`SELECT * FROM consultas`);
    } catch (error) {
      throw new Error('Erro ao buscar consultas: ' + error.message);
    }
  }

  // ✅ Buscar por paciente
  static async buscarPorPaciente(pacienteId) {
    try {
      const query = `
        SELECT * FROM consultas
        WHERE pacienteId = ?
        ORDER BY data, hora
      `;

      return await db.all(query, [pacienteId]);
    } catch (error) {
      throw new Error('Erro ao buscar consultas do paciente: ' + error.message);
    }
  }

  // ✅ Buscar horários ocupados (IMPORTANTE PRA VALIDAÇÃO)
  static async buscarPorData(data) {
    try {
      const query = `
        SELECT hora FROM consultas
        WHERE data = ?
      `;

      return await db.all(query, [data]);
    } catch (error) {
      throw new Error('Erro ao buscar consultas por data: ' + error.message);
    }
  }

  // ✅ Atualizar
  static async atualizar(id, data, hora, medico) {
    try {
      const query = `
        UPDATE consultas
        SET data = ?, hora = ?, medico = ?
        WHERE id = ?
      `;

      const result = await db.run(query, [data, hora, medico, id]);

      return result.changes;
    } catch (error) {
      throw new Error('Erro ao atualizar consulta: ' + error.message);
    }
  }

  // ✅ Deletar
  static async deletar(id) {
    try {
      const result = await db.run(
        `DELETE FROM consultas WHERE id = ?`,
        [id]
      );

      return result.changes;
    } catch (error) {
      throw new Error('Erro ao deletar consulta: ' + error.message);
    }
  }
}

module.exports = Consulta;