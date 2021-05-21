const Publicacao = require("../models/publicacoes");
const Usuario = require("../models/usuarios");

exports.novaPublicacao = async function(request, response){

    try {
        if(await Usuario.exists({ email: request.body.email })){

            if(await Usuario.exists({ token: request.body.token })){

                const novaPub = new Publicacao(request.body);
                await novaPub.save().then(response.status(200).send({ Ok_Msg: `Publicacao do ${novaPub.email} Realizada com Sucesso!` }));
            }
            else{
                throw "Token de Usuario Invalido"
            }

        }
        else{
            throw "Usuario nao Existe!";
        }
    } catch (error) {
        response.status(500).send({Err_Msg: `Ops, Ocorreu um Problema: ${error}`});
    }
}
