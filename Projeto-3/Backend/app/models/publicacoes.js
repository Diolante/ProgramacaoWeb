const mongoose = require("mongoose"); 

const Publicacao = new mongoose.Schema({
    email: {
        type: String,
        required: false},

    conteudo: {
        type: String,
        required: true},
    
    token: {
        type: String,
        required: true}

}, { collection: "publicacoes" });

module.exports = mongoose.model("publicacao", Publicacao);