const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

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
    res.render("index.ejs");
});

app.get("/perguntar", function (req, res) {
    res.render("perguntar.ejs");
});

app.post("/salvarPergunta", function(req, res) {
    res.send("Formulário recebido!");
});

app.listen(4000, () => {
    console.log("Servidor rodando");
})