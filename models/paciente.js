const db = require('../database');

class Paciente {
  static async criar(nome, data_nascimento, cpf, cartao_sus, telefone, email) {
    try {
      const query = `
        INSERT INTO pacientes (nome, data_nascimento, cpf, cartao_sus, telefone, email)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const params = [nome, data_nascimento, cpf, cartao_sus, telefone, email];
      const result = await db.run(query, params);
      return result.lastID;
    } catch (error) {
      throw new Error('Erro ao criar paciente: ' + error.message);
    }
  }

  static async buscarPorId(id) {
    try {
      const query = `
        SELECT * FROM pacientes
        WHERE id = ?
      `;
      const params = [id];
      const paciente = await db.get(query, params);
      return paciente;
    } catch (error) {
      throw new Error('Erro ao buscar paciente: ' + error.message);
    }
  }

  static async buscarTodos() {
    try {
      const query = `
        SELECT * FROM pacientes
      `;
      const pacientes = await db.all(query);
      return pacientes;
    } catch (error) {
      throw new Error('Erro ao buscar pacientes: ' + error.message);
    }
  }

  static async atualizar(id, nome, data_nascimento, cpf, cartao_sus, telefone, email) {
    try {
      const query = `
        UPDATE pacientes
        SET nome = ?, data_nascimento = ?, cpf = ?, cartao_sus = ?, telefone = ?, email = ?
        WHERE id = ?
      `;
      const params = [nome, data_nascimento, cpf, cartao_sus, telefone, email, id];
      const result = await db.run(query, params);
      return result.changes; // Retorna número de linhas afetadas
    } catch (error) {
      throw new Error('Erro ao atualizar paciente: ' + error.message);
    }
  }

  static async deletar(id) {
    try {
      const query = `
        DELETE FROM pacientes
        WHERE id = ?
      `;
      const params = [id];
      const result = await db.run(query, params);
      return result.changes; // Retorna número de linhas afetadas
    } catch (error) {
      throw new Error('Erro ao deletar paciente: ' + error.message);
    }
  }
}

module.exports = Paciente;