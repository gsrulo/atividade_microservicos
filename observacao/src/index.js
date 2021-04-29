const express = require("express");
const app = express();
app.use(express.json());
const axios = require("axios");
const observacoesPorIngressoId = {};

const { v4: uuidv4 } = require("uuid");

const funcoes = {
  ObservacaoClassificada: (observacao) => {
    observacao = observacoesPorIngressoId[observacao.ingressoId];
    const obsParaAtualizar = observacoes.find((o) => o.id === observacao.id);
    obsParaAtualizar.status = observacao.status;
    axios.post("http://localhost:10000/eventos", {
      tipo: "ObservacaoAtualizada",
      dados: {
        id: observacao.id,
        ingresso: [
          {
            v4: uuidv4,
            descricao: string,
            quantidade: int,
          },
        ],
        ingressoId: observacao.ingressoId,
        status: observacao.status,
      },
    });
  },
};
app.post("/eventos", (req, res) => {
  try {
    funcoes[req.body.tipo](req.body.dados);
  } catch (err) {}
  res.status(200).send({
    msg: "ok",
  });
});
app.put("/ingressos/:id/observacoes", async (req, res) => {
  const idObs = uuidv4();
  const {
    ingresso: [{ v4: uuidv4, descricao: string, quantidade: int }],
  } = req.body;
  const observacoesDoIngresso = observacoesPorIngressoId[req.params.id] || [];
  observacoesDoIngresso.push({
    id: idObs,
    ingresso: [
      {
        v4: uuidv4,
        descricao: string,
        quantidade: int,
      },
    ],
    status: "comum",
  });
  observacoesPorIngressoId[req.params.id] = observacoesDoIngresso;
  await axios.post("http://localhost:10000/eventos", {
    tipo: "ObservacaoCriada",
    dados: {
      id: idObs,
      ingresso: [
        {
          v4: uuidv4,
          descricao: string,
          quantidade: int,
        },
      ],
      ingressoId: req.params.id,
      status: "comum",
    },
  });
  res.status(201).send(observacoesDoIngresso);
});
app.get("/ingressos/:id/observacoes", (req, res) => {
  res.send(observacoesPorIngressoId[req.params.id] || []);
});
app.listen(5000, () => {
  console.log("Ingressos. Porta 5000");
});
