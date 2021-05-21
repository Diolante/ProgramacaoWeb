const Publicacao = require("../models/publicacoes");
const Usuario = require("../models/usuarios");

exports.carregaPublicacoes = async function(request, response){
    try{
        if(await Usuario.exists({ token: request.params.token })){

            const publicacoes = await Publicacao.find({ token : { $in : request.params.token }}, {conteudo: 1});
            response.status(200).send({ Ok_Msg: `Publicacoes Encontradas para ${request.params.token}`, Publicacoes_Usuario: publicacoes });
        }
        else
        {
            throw "Token Invalido!";
        }
    }
    catch (error) {
        response.status(500).send({ Err_Msg: `Ops, Ocorreu um Problema: ${error}`});
    }


}
