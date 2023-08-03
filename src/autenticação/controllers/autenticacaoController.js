const connection = require('../../models/connection');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const accessSecret = process.env.ACCESS_SECRET;
const refreshSecret = process.env.REFRESH_SECRET;

const register = async (req, res) => {
  const { nome, email, senha, permissao } = req.body;

  if (!nome) {
    return res.status(422).json({ mensagem: "O nome é obrigatório!" });
  }

  if (!email) {
    return res.status(422).json({ mensagem: "O email é obrigatório!" });
  }

  if (!senha) {
    return res.status(422).json({ mensagem: "A senha é obrigatória!" });
  }

  try {
    const [existingUserRows] = await connection.execute(
      'SELECT * FROM adm WHERE email = ?',
      [email]
    );

    if (existingUserRows.length > 0) {
      return res.status(422).json({ mensagem: "Por favor, utilize outro email" });
    }

    const salt = await bcrypt.genSalt(12);
    const senhaHash = await bcrypt.hash(senha, salt);

    let table = '';
    switch (permissao) {
      case 1:
        table = 'adm';
        break;
      case 2:
        table = 'almoxarifes';
        break;
      case 3:
        table = 'requisitante';
        break;
    }

    await connection.execute(
      `INSERT INTO ${table}(nome, email, senha, permissao) VALUES (?, ?, ?, ?)`,
      [nome, email, senhaHash, permissao]
    );

    res.status(201).json({ mensagem: "Usuário criado com sucesso" });
  } catch (error) {
    res.status(500).json({ mensagem: error.message });
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email) {
    return res.status(422).json({ mensagem: "O email é obrigatório" });
  }

  if (!senha) {
    return res.status(422).json({ mensagem: "A senha é obrigatória" });
  }

  try {
    const [admRows] = await connection.execute(
      'SELECT * FROM adm WHERE email = ?',
      [email]
    );

    const [almoxarifesRows] = await connection.execute(
      'SELECT * FROM almoxarifes WHERE email = ?',
      [email]
    );

    const [requisitanteRows] = await connection.execute(
      'SELECT * FROM requisitante WHERE email = ?',
      [email]
    );

    const user = admRows[0] || almoxarifesRows[0] || requisitanteRows[0];

    if (!user) {
      return res.status(404).json({ mensagem: "Email incorreto" });
    }

    const checksenha = await bcrypt.compare(senha, user.senha);

    if (!checksenha) {
      return res.status(422).json({ mensagem: "Senha incorreta" });
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        permissao: user.permissao
      },
      accessSecret,
      { expiresIn: '20m' }
    );

    const refreshToken = jwt.sign(
      {
        email: user.email,
        permissao: user.permissao
      },
      refreshSecret,
      { expiresIn: '24h' }
    );

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ mensagem: error.message });
  }
};

const refresh = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ mensagem: "Token de atualização não fornecido" });
  }

  try {
    const decodedRefreshToken = jwt.verify(refreshToken, refreshSecret);

    let table = '';
    switch (decodedRefreshToken.permissao) {
      case 1:
        table = 'adm';
        break;
      case 2:
        table = 'almoxarifes';
        break;
      case 3:
        table = 'requisitante';
        break;
    }

    const [userRows] = await connection.execute(`SELECT * FROM ${table} WHERE email = ?`, [decodedRefreshToken.email]);

    if (userRows.length === 0) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    const user = userRows[0];

    const newAccessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        permissao: user.permissao
      },
      accessSecret,
      { expiresIn: '20m' }
    );

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ mensagem: "Token de atualização expirado" });
    }
    return res.status(500).json({ mensagem: "Erro ao atualizar o token de acesso" });
  }
};

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ mensagem: "Acesso negado" });

  try {
    const secret = process.env.ACCESS_SECRET;

    jwt.verify(token, secret);

    next();
  } catch (err) {
    res.status(400).json({ mensagem: "Token inválido" });
  }
};

function verificarPermissao(permissao) {
  return (req, res, next) => {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ mensagem: 'Token de autorização não fornecido' });
    }

    try {
      const secret = process.env.ACCESS_SECRET;
      const decodedToken = jwt.verify(token, secret);

      if (decodedToken.permissao !== permissao) {
        return res.status(403).json({ mensagem: 'Permissão negada' });
      }

      req.user = decodedToken;
      next();
    } catch (error) {
      res.status(500).json({ mensagem: 'Erro ao verificar token' });
    }
  };
};

module.exports = {
  register,
  login,
  refresh,
  checkToken,
  verificarPermissao
};