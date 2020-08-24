const GerenciadoresModel = require("../model/GerenciadoresModel");

module.exports = {
    async register(request, response, next) {
        
        const {nomeCompleto, email, senha, cpf, ehAdmin } = request.body;

        if (
            typeof nomeCompleto === "undefined" ||
            typeof email === "undefined" ||
            typeof cpf === "undefined" ||
            typeof senha === "undefined" ||
            typeof ehAdmin === "undefined"
        ) {
            response.status(400).send({message: "Error undefined body!"});
        }

        try {
            const gerenciador = await GerenciadoresModel.create({
                nomeCompleto, email, senha, cpf, ehAdmin
            });

            return response.send(gerenciador);
        } catch (err) {
            return response.status(400).send({message: "Error on register Gerenciador!"});
        }
    },
    
    async get(request, response, next) {
        try {

            const { id } = request.params;
            let gerenciador = null;
            if (typeof id === "undefined") {
                gerenciador = await GerenciadoresModel.getAll();
            } else {
                gerenciador = await GerenciadoresModel.getId(id);
            }
            

            return response.send(gerenciador);
        } catch (err) {
            return response.status(400).send({message: "Error on get Gerenciador!"});
        }
    },

    async update(request, response, next) {
        try {

            const { id, nomeCompleto, email, senha, cpf, ehAdmin } = request.body;
            const gerenciador = await GerenciadoresModel.update({
                id, nomeCompleto, email, senha, cpf, ehAdmin
            });
            

            return response.send(gerenciador);
        } catch (err) {
            return response.status(400).send({message: "Error on get Gerenciador!"});
        }
    },
    
    async delete(request, response, next) {
        try {

            const { id } = request.params;
            const gerenciador = await GerenciadoresModel.deleteId(id);
            

            return response.send(gerenciador);
        } catch (err) {
            return response.status(400).send({message: "Error on get Gerenciador!"});
        }
    }   
};

