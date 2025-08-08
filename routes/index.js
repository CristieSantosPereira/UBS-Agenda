const express = require('express');
const router = express.Router();

// Rota para a página inicial
router.get('/', (req, res) => {
  res.render('index');
});

// Rota para a página de consultas
router.get('/consultas', (req, res) => {
  // Lógica para buscar as consultas no banco de dados
  const consultas = [
    { data: '2022-01-01', hora: '10:00', medico: 'Dr. José' },
    { data: '2022-01-02', hora: '11:00', medico: 'Dra. Maria' }
  ];
  res.render('consultas', { consultas });
});

// Rota para a página de perfil
router.get('/perfil', (req, res) => {
  const paciente = {
    nome: 'João Silva',
    data_nascimento: '1990-01-01',
    cpf: '123.456.789-00',
    cartao_sus: '123456789012345',
    telefone: '(11) 1234-5678',
    email: 'joao.silva@example.com'
  };

  const consultas = [
    {
      data: '2022-01-01',
      medico: 'Dr. José',
      observacoes: 'Consulta de rotina'
    },
    {
      data: '2022-01-02',
      medico: 'Dra. Maria',
      observacoes: 'Retorno'
    }
  ];

  res.render('perfil', { paciente, consultas });
});

// Rota para cadastrar paciente
router.post('/paciente', (req, res) => {
  // Lógica para salvar o paciente no banco de dados
  res.redirect('/consultas');
});

// Rota para agendar consulta
router.post('/consultas', (req, res) => {
  // Lógica para salvar a consulta no banco de dados
  res.redirect('/consultas');
});

module.exports = router;