const express = require('express');
const app = express();
const path = require('path');

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir arquivos estáticos (coloque antes das rotas)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsear requisições
app.use(express.urlencoded({ extended: true }));

// Rota para a página inicial
app.get('/', (req, res) => {
  res.render('index');
});

// Array temporário para armazenar consultas (em memória)
let consultas = [
  { data: '2022-01-01', hora: '09:00', medico: 'Dr. José' },
  { data: '2022-02-01', hora: '10:00', medico: 'Dra. Maria' }
];

// Rota para a página de consultas
app.get('/consultas', (req, res) => {
  res.render('consultas', { consultas });
});

// Rota POST para agendar nova consulta
app.post('/consultas', (req, res) => {
  const { data, hora, medico } = req.body;
  consultas.push({ data, hora, medico });
  // Redireciona para o perfil (ajuste para /perfil/:id se tiver o id do paciente)
  res.redirect('/perfil');
});

// Rota para a página de perfil
app.get('/perfil', (req, res) => {
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
      data: '2022-02-01',
      medico: 'Dr. Maria',
      observacoes: 'Retorno'
    }
  ];

  res.render('perfil', { paciente, consultas });
});

app.post('/paciente', (req, res) => {
  // Aqui você pode salvar os dados ou apenas exibir uma mensagem de sucesso
  res.redirect('/consultas');
});

// Iniciar o servidor
const port = 1000;
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
