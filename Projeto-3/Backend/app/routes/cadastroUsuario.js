const Usuario = require("../models/usuarios");

exports.cadastrarUsuario = async function(request, response){
    
    try {
        if(!await Usuario.exists({ email: request.body.email })){

            var token = Math.random().toString(36).substring(1);
            const novoUsuario = new Usuario({email: request.body.email, senha: request.body.senha, token: token});
            await novoUsuario.save().then(response.status(200).send( {Ok_Msg: `Usuario ${novoUsuario.email} Cadastrado com Sucesso! `} ));
        }
        else{
            throw "Email ja cadastrado!";
        }
        
    } catch (error) {
        response.status(500).send({Err_Msg: `Ops, Ocorreu um Problema: ${error}`});
    }

};

