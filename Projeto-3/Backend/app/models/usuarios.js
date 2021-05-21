const mongoose = require("mongoose"); 

const Usuario = new mongoose.Schema({
    email: {
        type: String,
        required: true},
        
    senha: {
        type: String,
        required: true},

    token: {
        type: String,
        required: true}

},{ collection: "usuarios" });

module.exports = mongoose.model("usuario", Usuario);