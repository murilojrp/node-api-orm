const db = require('../models');
const timesSerieA = db.rest.models.timesSerieA;

exports.getTimesSerieA = async (req, res) => {
  const { id } = req.params;

  try {
    const times = await timesSerieA.findOne({
      where: {
        id,
      },
    });

    if (!times) {
      return res.status(400).send({
        message: `Não foi encontrado time com id ${id}`,
      });
    }

    return res.send(times);
  } catch (err) {
    return res.status(500).send({
      message: `Erro: ${err.message}`,
    });
  }
};

exports.createTimesSerieA = async (req, res) => {
  const { nome, tecnico, anoFundacao, posicao, pontos } = req.body;
  if (!nome || !posicao) {
    return res.status(400).send({
      message: 'Por favor, informe um nome e a posição do time para cadastra-lo na tabela!',
    });
  }

  let timeExiste = await timesSerieA.findOne({
    where: {
      posicao,
    },
  });

  if (timeExiste) {
    return res.status(400).send({
      message: 'Já existe um time nesse posição, sinto muito.',
    });
  }

  try {
    let novotimesSerieA = await timesSerieA.create({
        nome, 
        tecnico, 
        anoFundacao, 
        posicao, 
        pontos,
    });
    return res.send(novotimesSerieA);
  } catch (err) {
    return res.status(500).send({
      message: `Erro: ${err.message}`,
    });
  }
};

exports.deleteTimesSerieA = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send({
      message: 'Por favor, informe a posição do time que você está tentando deletar!',
    });
  }

  const times = await timesSerieA.findOne({
    where: {
      id,
    },
  });

  if (!times) {
    return res.status(400).send({
      message: `Nenhum time encontrado na posição ${id}`,
    });
  }

  try {
    await times.destroy();
    return res.send({
      message: `Time de id ${id} do Brasileirão Série A 2022 deletado!`,
    });
  } catch (err) {
    return res.status(500).send({
      message: `Erro: ${err.message}`,
    });
  }
};

exports.updateTimesSerieA = async (req, res) => {
  const { nome, tecnico, anoFundacao, posicao, pontos } = req.body;
  const { id } = req.params;

  const times = await timesSerieA.findOne({
    where: {
      id,
    },
  });

  if (!times) {
    return res.status(400).send({
      message: `Nenhum time encontrado com o id ${id}`,
    });
  }

  try {
    if (nome) {
      times.nome = nome;
    }
    if (tecnico) {
      times.tecnico = tecnico;
    }
    if (anoFundacao) {
     times.anoFundacao = anoFundacao;
    }
    if (posicao) {
      times.posicao = posicao;
    }
    if (pontos) {
      times.pontos = pontos;
    }

    times.save();
    return res.send({
      message: `Time de id:${id} atualizado com sucesso!`,
    });
  } catch (err) {
    return res.status(500).send({
      message: `Erro: ${err.message}`,
    });
  }
};
