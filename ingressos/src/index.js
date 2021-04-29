const express = require("express");
const app = express();
app.use(express.json());
const axios = require("axios");
const ingressos = {};
contador = 0;

app.get("/ingressos", (req, res) => {
    res.send(ingressos);
});
app.put("/ingressos", async (req, res) => {
    contador++;
    const {
        ingresso: [{
            v4: uuidv4,
            descricao: string,
            quantidade: int
        }]
    } = req.body;
    ingressos[contador] = {
        contador,
        ingresso: [{
            v4: uuidv4,
            descricao: string,
            quantidade: int
        }]
    } 
    await axios.post("http://localhost:10000/eventos", {
        tipo: "IngressoCriado",
        dados: {
            contador,
            ingresso: [{
                v4: uuidv4,
                descricao: string,
                quantidade: int
            }]
        }
    });
    res.status(201).send(ingressos[contador]);
});
app.delete("/ingressos/:id", (req,res,next) => {
    const ingressoId = req.params.id;
    ingressos.forEach((ingresso,index) => {
        if(ingresso.id == ingressoId) {
           return ingressos.splice(index,1);
        }
    })
    res.status(200).json(ingressos);
});
app.listen(3000, () => {
    console.log("Ingressos. Porta 3000");
});