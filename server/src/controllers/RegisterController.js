const GerenciadoresModel = require("../model/GerenciadoresModel");

module.exports = {
    async register(request, response) {
        const {nomeCompleto, email, senha, cpf, ehAdmin } = request.body;
        console.log(request.body);
        console.log("someone is trying to register ...");
        
        GerenciadoresModel.register(nomeCompleto, email, senha, cpf, ehAdmin, (err, res) => {
            if (err) {
                response.status(400).send({message: "Error on insert database!", ...err});
            } else {
                response.status(200).send({message: "it worked!"})
            }
        });
        // response.status(200).send({message: "worked!"});
    }   
};

