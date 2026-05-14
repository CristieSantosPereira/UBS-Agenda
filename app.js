const express = require('express');
const path = require('path');

const { connect } = require('./config/database');
const Paciente = require('./models/paciente');
const Consulta = require('./models/consulta');

const app = express();

// Conectar ao banco
connect();

// Configurações
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.urlencoded({ extended: true }));

// =============================
// ROTA INICIAL
// =============================
app.get('/', (req, res) => {
  res.render('index');
});

// =============================
// PÁGINA DE CONSULTAS
// =============================
app.get('/consultas/:pacienteId', (req, res) => {
  const pacienteId = req.params.pacienteId;

  res.render('consultas', { pacienteId });
});

// =============================
// PERFIL DO PACIENTE
// =============================
app.get('/perfil/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const paciente = await Paciente.buscarPorId(id);
    const consultas = await Consulta.buscarPorPaciente(id);

    res.render('perfil', { paciente, consultas });

  } catch (error) {
    console.error(error);
    res.send('Erro ao carregar perfil');
  }
});

// =============================
// CADASTRAR PACIENTE
// =============================
app.post('/paciente', async (req, res) => {
  try {
    const {
      nome,
      data_nascimento,
      cpf,
      cartao_sus,
      telefone,
      email
    } = req.body;

    const pacienteId = await Paciente.criar({
      nome,
      data_nascimento,
      cpf,
      cartao_sus,
      telefone,
      email
    });

    // REDIRECT CORRETO
    res.redirect(`/consultas/${pacienteId}`);

  } catch (error) {
    console.error(error);
    res.send('Erro ao cadastrar paciente');
  }
});

// =============================
// AGENDAR CONSULTA
// =============================
app.post('/consultas', async (req, res) => {
  try {
    const { data, hora, medico, pacienteId } = req.body;

    const existentes = await Consulta.buscarPorData(data);

    const ocupado = existentes.find(c => c.hora === hora);

    if (ocupado) {
      return res.send("Esse horário já foi escolhido!");
    }

    await Consulta.criar(data, hora, medico, pacienteId);

    res.redirect(`/perfil/${pacienteId}`);

  } catch (error) {
    console.error(error);
    res.send("Erro ao agendar consulta");
  }
});

// =============================
// SERVIDOR
// =============================
const port = 1000;

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});