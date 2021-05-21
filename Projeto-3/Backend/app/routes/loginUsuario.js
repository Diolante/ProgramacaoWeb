const Usuario = require("../models/usuarios");

exports.loggarUsuario = async function(request, response){

    try {
        if(await Usuario.exists({ email: request.body.email, senha: request.body.senha })){

            const queryResult = await Usuario.findOne({email: request.body.email}, {token: 1});
            response.status(200).send({ Ok_Msg: `Usuario ${request.body.email} Logado com Sucesso! `, token: queryResult.token });

        }
        else{
            throw "Usuario Inexistente ou Senha Incorreta!!";
        }
    } catch (error) {
        response.status(500).send({ Err_Msg: `Ops, Ocorreu um Problema: ${error}`});
    }
};