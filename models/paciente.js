const db = require('../database');

class Paciente {

  // ✅ Criar paciente
  static async criar(nome, data_nascimento, cpf, cartao_sus, telefone, email) {
    try {
      const query = `
        INSERT INTO pacientes 
        (nome, data_nascimento, cpf, cartao_sus, telefone, email)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      const params = [nome, data_nascimento, cpf, cartao_sus, telefone, email];

      const result = await db.run(query, params);

      return result.lastID;

    } catch (error) {
      throw new Error('Erro ao criar paciente: ' + error.message);
    }
  }

  // ✅ Buscar por ID
  static async buscarPorId(id) {
    try {
      const query = `SELECT * FROM pacientes WHERE id = ?`;
      return await db.get(query, [id]);
    } catch (error) {
      throw new Error('Erro ao buscar paciente: ' + error.message);
    }
  }

  // ✅ Buscar por Cartão SUS (login simples)
  static async buscarPorCartao(cartao_sus) {
    try {
      const query = `SELECT * FROM pacientes WHERE cartao_sus = ?`;
      return await db.get(query, [cartao_sus]);
    } catch (error) {
      throw new Error('Erro ao buscar paciente: ' + error.message);
    }
  }

  // ✅ Listar todos
  static async buscarTodos() {
    try {
      return await db.all(`SELECT * FROM pacientes`);
    } catch (error) {
      throw new Error('Erro ao listar pacientes: ' + error.message);
    }
  }

  // ✅ Atualizar
  static async atualizar(id, nome, telefone, email) {
    try {
      const query = `
        UPDATE pacientes
        SET nome = ?, telefone = ?, email = ?
        WHERE id = ?
      `;

      const result = await db.run(query, [nome, telefone, email, id]);

      return result.changes;
    } catch (error) {
      throw new Error('Erro ao atualizar paciente: ' + error.message);
    }
  }

  // ✅ Deletar
  static async deletar(id) {
    try {
      const result = await db.run(
        `DELETE FROM pacientes WHERE id = ?`,
        [id]
      );

      return result.changes;
    } catch (error) {
      throw new Error('Erro ao deletar paciente: ' + error.message);
    }
  }
}

module.exports = Paciente;