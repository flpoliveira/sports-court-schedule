const UsuariosModel = require("../model/UsuariosModel");

module.exports = {
    async create(request, response, next) {
        
        const {nomecompleto, email, cpf } = request.body;
        try {
            if (
                typeof nomecompleto === "undefined" ||
                typeof email === "undefined" ||
                typeof cpf === "undefined" 
            ) {
                response.status(400).send({message: "Error undefined body!"});
            }

            const usuario = await UsuariosModel.create({
                nomecompleto, email, cpf
            });

            return response.send(usuario);
        } catch (err) {
            return response.status(400).send({message: "Error on register Usuario!"});
        }
    },
    
    async get(request, response, next) {
        try {

            const { id } = request.query;
            let usuario = null;
            if (typeof id === "undefined") {
                usuario = await UsuariosModel.getAll();
            } else {
                usuario = await UsuariosModel.getId(id);
            }
            console.log(usuario);

            return response.send(usuario);
        } catch (err) {
            return response.status(400).send({message: "Error on get Gerenciador!"});
        }
    },

    async delete(request, response, next) {
        try {

            const { id } = request.params;
            const usuario = await UsuariosModel.deleteId(id);
            

            return response.send(usuario);
        } catch (err) {
            return response.status(400).send({message: "Error on get Usuario!"});
        }
    }   
};

