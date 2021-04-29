const express = require("express");
const app = express();
app.use(express.json());
const axios = require("axios");
const clientes = {};
contador = 0;

app.get("/clientes", (req, res) => {
  res.send(clientes);
});
app.put("/clientes", async (req, res) => {
  contador++;
  const {
    cliente: [{ nome, endereco, idade, status }],
  } = req.body;
  clientes[contador] = {
    contador,
    cliente: [
      {
        nome,
        endereco,
        idade,
        status,
      },
    ],
  };
  await axios.post("http://localhost:10000/eventos", {
    tipo: "ClienteCriado",
    dados: {
      contador,
      cliente: [
        {
          nome,
          endereco,
          idade,
          status,
        },
      ],
    },
  });
  res.status(201).send(clientes[contador]);
});
app.delete("/clientes/:id", (req, res, next) => {
  const idClienteDeletado = req.params.id;
  clientes.forEach((cliente, index) => {
    if (cliente.id == idClienteDeletado) clientes.splice(index);
  });
  res.status(201).json(clientes);
});
app.listen(4000, () => {
  console.log("clientes. Porta 4000");
});
