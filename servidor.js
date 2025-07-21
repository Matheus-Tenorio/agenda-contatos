const express = require("express");
const { MongoClient } = require("mongodb");
const path = require("path");

const app = express();
const client = new MongoClient("mongodb+srv://BancoContatos:bancodedados2@cluster.mongodb.net/?retryWrites=true&w=majority&appName=AGENDA_CONTATOS");
const dbName = "agenda";
let db;

app.use(express.json());
app.use(express.static(__dirname)); 

app.post("/contatos", async (req, res) => {
    try {
        const contato = req.body;
        await db.collection("contatos").insertOne(contato);
        res.sendStatus(200);
    } catch (error) {
        console.error("Erro ao inserir:", error);
        res.sendStatus(500);
    }
});

app.get("/contatos", async (req, res) => {
    try {
        const contatos = await db.collection("contatos").find().toArray();
        res.json(contatos);
    } catch (error) {
        console.error("Erro ao buscar:", error);
        res.sendStatus(500);
    }
});

async function start() {
    try {
        await client.connect();
        db = client.db(dbName);
        console.log("Conectado ao MongoDB");

        app.listen(3000, () => {
            console.log("Servidor rodando em http://localhost:3000");
        });
    } catch (err) {
        console.error("Erro ao conectar ao MongoDB:", err);
    }
}

start();
