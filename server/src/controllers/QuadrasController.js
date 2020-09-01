const QuadrasModel = require("../model/QuadrasModel");

module.exports = {
    async create(request, response, next) {
        
        const {nome, descricao, idbloco } = request.body;
        try {
            if (
                typeof nome === "undefined" ||
                typeof descricao === "undefined" ||
                typeof idbloco === "undefined"
            ) {
                response.status(400).send({message: "Error undefined body!"});
            }

            const quadra = await QuadrasModel.create({
                nome, descricao, idbloco
            });

            return response.send(quadra);
        } catch (err) {
            return response.status(400).send({message: "Error on register Usuario!"});
        }
    },
    
    async get(request, response, next) {
        try {

            const { id } = request.query;
            let quadra = null;
            if (typeof id === "undefined") {
                quadra = await QuadrasModel.getAll();
            } else {
                quadra = await QuadrasModel.getId(id);
            }
            

            return response.send(quadra);
        } catch (err) {
            return response.status(400).send({message: "Error on get Gerenciador!"});
        }
    },

    async delete(request, response, next) {
        try {
            const { id } = request.params;
            const quadra = await QuadrasModel.deleteId(id);
            return response.send(quadra);
            
        } catch (err) {
            return response.status(400).send({message: "Error on get Usuario!"});
        }
    }   
};

