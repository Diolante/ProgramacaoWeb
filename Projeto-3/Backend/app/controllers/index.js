const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");

const app = express();
app.use(cors())
app.use(express.json()); 



var loginRoute = require("../routes/loginUsuario");
var cadastroRoute = require("../routes/cadastroUsuario");
var novaPublicacaoRoute = require("../routes/novaPublicacao");
var carregaPublicacoesRoute = require("../routes/carregaPublicacoes");


let port = process.env.PORT || 3000;

app.post('/login_usuario', loginRoute.loggarUsuario);

app.post('/cadastro_usuario', cadastroRoute.cadastrarUsuario);

app.post('/nova_publicacao', novaPublicacaoRoute.novaPublicacao);

app.get('/carrega_publicacoes/:token', carregaPublicacoesRoute.carregaPublicacoes);


mongoose.connect("mongodb://Heroku_Login:1q2w3e4r5t@projeto3-db-shard-00-00.fvhct.mongodb.net:27017?ssl=true&replicaSet=atlas-qic1xf-shard-0&authSource=admin&retryWrites=true&w=majority", {
                    useUnifiedTopology: true, 
                    useNewUrlParser: true,
                    useCreateIndex: true}).then(console.log("Conectado ao Mongoose DB!"));

app.listen(port, () => {
    console.log(`Tamo ouvindo na porta: http://localhost:${port}`);
})

