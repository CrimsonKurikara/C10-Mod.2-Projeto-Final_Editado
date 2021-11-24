const express = require("express");
const path = require("path");
const app = express();
require('dotenv').config()

let mensagem = ""

const port = process.env.PORT || 3000;
const db = require('./model/database')
const Jogos = require('./model/jogo');


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded())

app.get('/' , async (req, res) =>{
    let jogos = await Jogos.findAll();
    res.render("index", {mensagem, jogos});
});

app.get('/cadastro' , (req, res) => {
    res.render('cadastro');
});

app.post('/cadastro', async(req, res) =>{
    const {nome, genero, imagem, descritivo} = req.body
    await Jogos.create({
        nome,
        genero,
        imagem,
        descritivo,
    })
    mensagem = `O jogo ${nome} foi adicionado`
    res.redirect('/')
})

db.conectado();
app.listen(port, () =>console.log(`Servidor rodando em http://localhost:${port}`));