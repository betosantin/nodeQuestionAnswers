const express = require("express");
const app = express();
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

connection.authenticate().then(() => {
    console.log("Conexão ao bd ok.");
}).catch((erro) => {
    console.log(erro);
});

app.set("view engine", "ejs");
app.use(express.static("public"));

//body parsers
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.get("/teste/:nome?/:lang?", function (req, res) {
//     //res.send("Bem vindo.");
//     var nome = req.params.nome;
//     var lang = req.params.lang;
//     var exibeMsg = req.params.nome && req.params.lang;

//     var produtos = [
//         {nome: "Doritos", preco: 1.99},
//         {nome: "Pepsi Lata", preco: 2.69},
//         {nome: "BK", preco: 3.99},
//     ];
//     res.render("index.ejs", {
//         nome: nome,
//         lang: lang,
//         msg: exibeMsg,
//         produtos: produtos
//     });
// });

app.get("/", function (req, res) {
    Pergunta.findAll({
        raw: true,
        order: [['id', 'DESC']]
    }).then( perguntas =>{
        res.render("index.ejs", {
            perguntas: perguntas
        });
    });
});

app.get("/perguntar", function (req, res) {
    res.render("perguntar.ejs");
});

app.post("/salvarPergunta", function (req, res) {
    var titulo = req.body.titulo;
    console.log(titulo);
    var descricao = req.body.descricao;
    console.log(descricao);

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect("/");
    });

    // res.send("Formulário recebido!<br/>"
    //     + "Título: " + titulo
    //     + "<br/>Descrição: " + descricao);
});

app.get("/pergunta/:id",(req, res)=>{
    var id = req.params.id;

    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta =>{
        if(pergunta){

            Resposta.findAll({
                where: { perguntaId: pergunta.id },
                order: [['id', 'DESC']]
            }).then(respostas => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            })
        } else {
            res.redirect("/");
        }
    })
});

app.post("/responder", (req, res)=>{
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId);
    });
});

app.listen(4000, () => {
    console.log("Servidor rodando");
})