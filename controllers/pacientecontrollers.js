// controllers/pacienteController.js
const Paciente = require('../models/paciente');

// Função para cadastrar paciente
exports.cadastrarPaciente = async (req, res) => {
  try {
    // Ajuste os nomes dos campos conforme o formulário
    const { nome, data_nascimento, cpf, cartao_sus, telefone, email } = req.body;

    if (!nome || !data_nascimento || !cpf || !cartao_sus || !telefone) {
      return res.status(400).send('Campos obrigatórios faltando.');
    }

    // Verificar se CPF já existe
    const pacienteExistente = await Paciente.findOne({ where: { cpf } });
    if (pacienteExistente) {
      return res.status(400).send('Paciente com este CPF já cadastrado.');
    }

    // Criar paciente
    const paciente = await Paciente.create({
      nome,
      data_nascimento,
      cpf,
      cartao_sus,
      telefone,
      email,
    });

    // Redirecionar para página de perfil do paciente
    res.redirect(`/perfil/${paciente.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro no servidor ao cadastrar paciente.');
  }
};

// Função para buscar paciente por ID
exports.buscarPacientePorId = async (req, res) => {
  try {
    const id = req.params.id;
    const paciente = await Paciente.findByPk(id);

    if (!paciente) {
      return res.status(404).send('Paciente não encontrado.');
    }

    // Exemplo: consultas pode ser buscado de outro model, aqui está vazio
    const consultas = [];

    res.render('perfil', { paciente, consultas });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro no servidor ao buscar paciente.');
  }
};
