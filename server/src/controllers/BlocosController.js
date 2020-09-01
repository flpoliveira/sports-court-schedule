const BlocosModel = require("../model/BlocosModel");

module.exports = {
    async create(request, response, next) {
        
        const {nome, descricao } = request.body;
        try {
            if (
                typeof nome === "undefined" ||
                typeof descricao === "undefined" 
            ) {
                response.status(400).send({message: "Error undefined body!"});
            }

            const bloco = await BlocosModel.create({
                nome, descricao
            });

            return response.send(bloco);
        } catch (err) {
            return response.status(400).send({message: "Error on register Usuario!"});
        }
    },
    
    async get(request, response, next) {
        try {

            const { id } = request.query;
            let bloco = null;
            if (typeof id === "undefined") {
                bloco = await BlocosModel.getAll();
            } else {
                bloco = await BlocosModel.getId(id);
            }
            

            return response.send(bloco);
        } catch (err) {
            return response.status(400).send({message: "Error on get Gerenciador!"});
        }
    },

    async delete(request, response, next) {
        try {
            const { id } = request.params;
            const bloco = await BlocosModel.deleteId(id);
            return response.send(bloco);
            
        } catch (err) {
            return response.status(400).send({message: "Error on get Usuario!"});
        }
    }   
};

