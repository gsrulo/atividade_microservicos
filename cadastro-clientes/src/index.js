const express = require("express");
const app = express();
app.use(express.json());
const axios = require("axios");
const clientes = {};
contador = 0;

app.get("/clientes", (req, res) => {
    res.send(clientes);
});
app.put("/clientes", async(req, res) => { 
    contador++;
    const {
        cliente: [
            {
                nome,
                endereco,
                idade: int,
                status 
            }
        ]
    } = req.body;
    clientes[contador] = {
        contador,
        cliente
    }
    await axios.post("http://localhost:10000/eventos", {
        tipo: "ClienteCriado",
        dados: {
            contador,
            cliente,  
        },
    });
    res.status(201).send(clientes[contador]);
});
app.listen(8000, () => {
    console.log("clientes. Porta 8000");
});