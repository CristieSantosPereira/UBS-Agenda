const express = require('express');
const app = express();
const path = require('path');

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para parsear requisições
app.use(express.urlencoded({ extended: true }));

// Rota para a página inicial
app.get('/', (req, res) => {
  res.render('index');
});

// Rota para a página de consultas
app.get('/consultas', (req, res) => {
  res.render('consultas');
});

// Rota para a página de perfil
app.get('/perfil', (req, res) => {
  res.render('perfil');
});

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
