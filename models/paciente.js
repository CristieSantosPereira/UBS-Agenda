const db = require('../database');

class Paciente {
  static async criar(nome, dataNascimento, cpf, cartaoSus, telefone, email) {
    const query = `
      INSERT INTO pacientes (nome, data_nascimento, cpf, cartao_sus, telefone, email)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [nome, dataNascimento, cpf, cartaoSus, telefone, email];
    const result = await db.run(query, params);
    return result.lastID;
  }

  static async buscarPorId(id) {
    const query = `
      SELECT * FROM pacientes
      WHERE id = ?
    `;
    const params = [id];
    const paciente = await db.get(query, params);
    return paciente;
  }

  static async buscarTodos() {
    const query = `
      SELECT * FROM pacientes
    `;
    const pacientes = await db.all(query);
    return pacientes;
  }

  static async atualizar(id, nome, dataNascimento, cpf, cartaoSus, telefone, email) {
    const query = `
      UPDATE pacientes
      SET nome = ?, data_nascimento = ?, cpf = ?, cartao_sus = ?, telefone = ?, email = ?
      WHERE id = ?
    `;
    const params = [nome, dataNascimento, cpf, cartaoSus, telefone, email, id];
    await db.run(query, params);
  }

  static async deletar(id) {
    const query = `
      DELETE FROM pacientes
      WHERE id = ?
    `;
    const params = [id];
    await db.run(query, params);
  }
}

module.exports = Paciente;