const express = require('express');
const router = express.Router();
const Paciente = require('../models/paciente');
const Consulta = require('../models/consulta');

// Página inicial
router.get('/', (req, res) => {
  res.render('index');
});

// Página de consultas
router.get('/consultas', async (req, res) => {
  try {
    const consultas = await Consulta.buscarTodos();
    res.render('consultas', { consultas });
  } catch (error) {
    res.status(500).send('Erro ao buscar consultas.');
  }
});

// Página de perfil do paciente
router.get('/perfil/:id', async (req, res) => {
  try {
    const paciente = await Paciente.buscarPorId(req.params.id);
    if (!paciente) return res.status(404).send('Paciente não encontrado.');

    // Para mostrar consultas do paciente, implemente buscarPorPacienteId no model Consulta
    const consultas = []; // Exemplo: await Consulta.buscarPorPacienteId(req.params.id);

    res.render('perfil', { paciente, consultas });
  } catch (error) {
    res.status(500).send('Erro ao buscar perfil.');
  }
});

// Cadastro de paciente
router.post('/paciente', async (req, res) => {
  try {
    const { nome, data_nascimento, cpf, cartao_sus, telefone, email } = req.body;
    const id = await Paciente.criar(nome, data_nascimento, cpf, cartao_sus, telefone, email);
    res.redirect(`/perfil/${id}`);
  } catch (error) {
    res.status(500).send('Erro ao cadastrar paciente.');
  }
});

// Agendamento de consulta
router.post('/consultas', async (req, res) => {
  try {
    const { data, hora, medico } = req.body;
    await Consulta.criar(data, hora, medico, null); // Passe null ou ajuste conforme necessidade
    res.redirect('/consultas');
  } catch (error) {
    res.status(500).send('Erro ao agendar consulta.');
  }
});

module.exports = router;