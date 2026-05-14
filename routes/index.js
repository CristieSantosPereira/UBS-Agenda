const Paciente = require('../models/paciente');
const Consulta = require('../models/consulta');
app.post('/consultas', async (req, res) => {
  try {
    const {
      nome,
      data_nascimento,
      cpf,
      cartao_sus,
      telefone,
      email,
      data,
      hora,
      medico
    } = req.body;

    // 🔍 Verifica se horário já existe
    const existentes = await Consulta.buscarPorData(data);
    const ocupado = existentes.find(c => c.hora === hora);

    if (ocupado) {
      return res.send("⚠️ Esse horário já está ocupado!");
    }

    // 1️⃣ cria paciente
    const pacienteId = await Paciente.criar({
      nome,
      data_nascimento,
      cpf,
      cartao_sus,
      telefone,
      email
    });

    // 2️⃣ cria consulta (AGORA CORRETO)
    await Consulta.criar(
      data,
      hora,
      medico,
      pacienteId
    );

    // 3️⃣ busca dados
    const paciente = await Paciente.buscarPorId(pacienteId);
    const consultas = await Consulta.buscarPorPaciente(pacienteId);

    // 4️⃣ renderiza perfil
    res.render('perfil', { paciente, consultas });

  } catch (error) {
    console.error(error);
    res.send('Erro ao salvar consulta');
  }
});