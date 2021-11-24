const express = require("express");
const router = express.Router();
const filmes = require('.././BD_Proj/jogos');

let mensagem = ""

router.get("/",  async (req, res) => {
  const jogo = await jogos.findAll();
    setTimeout(() => { mensagem = "";}, 5000);
  res.render("../views/index", {mensagem,jogo});
});

// cadastro

router.get("/cadastro", (req, res) => {
  res.render("../views/cadastro");
});

// cadastro do render

router.post("/New", async (req, res) => {

  const {nome,genero,imagem,descritivo} = req.body;
  const jogo = await jogos.create({
    nome:nome,
    genero:genero,
    imagem:imagem,
    descritivo:descritivo,
    })
  if (!nome){
res.redirect("/cadastro" ,{mensagem: "tabela nome esta vazia"})
  }else if  (!nome)
  {
res.redirect("/cadastro" ,{mensagem: "tabela genero esta vazia"})
  }else if  (!genero) 
  {
res.redirect("/cadastro" ,{mensagem: "tabela de imagem esta vazia"})
  }else if  (!imagem) 
  {
res.redirect("/cadastro" ,{mensagem: "tabela de descritivo esta vazia"})
  };
  mensagem = `O Jogo ${nome} foi adicionado`
res.redirect("/"),jogo})
 
//render detalhe

router.get("/detalhes/:id", async function (req, res){
  const filme = await filmes.findByPk(req.params.id);
  res.render("../views/detalhes",{jogo:jogo})

});

// deletar do render

router.get("/deletar/:id", async (req, res) => {
  const jogo = await jogos.findByPk(req.params.id);

  if (!jogo) {
    res.render("../views/deletar", {
      mensagem: "Jogo não encontrado!",
    });
  }

  res.render("../views/deletar", {
    jogo,
  });
});

// render delete

router.post('/deletar/deletar/:id', async (req,res) => {
  const jogo = await jogos.findByPk(req.params.id);

  if (!jogo) {    
    res.render("../views/deletar",  {mensagem: "Jogo não encontrado!",});};

  await jogo.destroy();
  const jogosList = await jogos.findAll();
  res.render("../views/index", {mensagem: `Jogo deletado com sucesso!`,  jogo:jogosList});
});


// editar do render

router.get('/editar/:id', async (req,res) => {
  const jogo = await jogos.findByPk(req.params.id);

  var options = [ 
    "Ação", "FPS", "Card Game", "RPG", "MOBA", "Drama","Simulador", "Corrida"];
  for ( var i = 0; i < options.length; i++ )
  {
      var selected = (jogo.genero == i ) ? "selected" : "";
  }

  res.render("../views/editar", {jogo:jogo});
});


// editar no render 

router.post("/editar/:id", async function (req,res){
    const jogo = await jogos.findByPk(req.params.id);
    const { nome, genero, image, descritivo, data} = req.body;
    
    jogo.id = req.params.id;
    jogo.nome = nome;
    jogo.genero = genero;
    jogo.imagem = image;
    jogo.descritivo = descritivo;
    
      if (!jogo) {
    res.render("../views/deletar", {
      mensagem: "Jogo não encontrado!",
    });
  }
    if (!nome){
res.redirect("/editar" ,{mensagem: "tabela nome esta vazia"})
  }else if  (!genero)
  {
res.redirect("/editar" ,{mensagem: "tabela genero esta vazia"})
  }else if  (!image) 
  {
res.redirect("/editar" ,{mensagem: "tabela de imagem esta vazia"})
  }else if  (!descritivo) 
  {
res.redirect("/editar" ,{mensagem: "tabela de descritivo esta vazia"})
  };

    mensagem = `O Jogo ${nome} foi alterado com sucesso!`
  
    await jogo.save();
    res.render("../views/editar",{jogo,mensagem});
});


module.exports = router