const db = require('../models');
const Usuario = db.rest.models.usuarios;

exports.getUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findOne({
      where: {
        id,
      },
    });

    if (!usuario) {
      return res.status(400).send({
        message: `Não foi encontrado usuário com id ${id}`,
      });
    }

    return res.send(usuario);
  } catch (err) {
    return res.status(500).send({
      message: `Erro: ${err.message}`,
    });
  }
};

exports.createUsuario = async (req, res) => {
  const { login, senha } = req.body;
  if (!login || !senha) {
    return res.status(400).send({
      message: 'Por favor, informe um login e uma senha para cadastrar um novo usuário!',
    });
  }

  let loginExiste = await Usuario.findOne({
    where: {
      login,
    },
  });

  if (loginExiste) {
    return res.status(400).send({
      message: 'Já existe um usuário cadastrado com esse login!',
    });
  }

  try {
    let novoUsuario = await Usuario.create({
      login,
      senha,
    });
    return res.send(novoUsuario);
  } catch (err) {
    return res.status(500).send({
      message: `Erro: ${err.message}`,
    });
  }
};

exports.deleteUsuario = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send({
      message: 'Por favor, informe o ID do usuário que você está tentando deletar!',
    });
  }

  const usuario = await Usuario.findOne({
    where: {
      id,
    },
  });

  if (!usuario) {
    return res.status(400).send({
      message: `Nenhum usuário encontrado com o id ${id}`,
    });
  }

  try {
    await usuario.destroy();
    return res.send({
      message: `Usuário ${id} foi deletado!`,
    });
  } catch (err) {
    return res.status(500).send({
      message: `Erro: ${err.message}`,
    });
  }
};

exports.updateUsuario = async (req, res) => {
  const { login, senha } = req.body;
  const { id } = req.params;

  const usuario = await Usuario.findOne({
    where: {
      id,
    },
  });

  if (!usuario) {
    return res.status(400).send({
      message: `Nenhum usuário encontrado com o id ${id}`,
    });
  }

  try {
    if (login) {
      usuario.login = login;
    }
    if (senha) {
      usuario.senha = senha;
    }

    usuario.save();
    return res.send({
      message: `Usuário ${id} atualizado com sucesso!`,
    });
  } catch (err) {
    return res.status(500).send({
      message: `Erro: ${err.message}`,
    });
  }
};
