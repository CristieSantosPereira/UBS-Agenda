const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send({ error: 'Token não fornecido.' });
    }
    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.usuario = decoded;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Por favor, autentique-se.' });
  }
};

module.exports = auth;
