const ReservasModel = require("../model/ReservasModel");

module.exports = {
    async create(request, response, next) {
        
        const {
            datahorainicio,
            datahorafim,
            ativo,
            motivo,
            idusuario,
            idquadra,
            idgerenciador 
        } = request.body;
        try {
            
            const reserva = await ReservasModel.create({
                datahorainicio,
                datahorafim,
                ativo,
                motivo,
                idusuario,
                idquadra,
                idgerenciador 
            });
            console.log(reserva);
            return response.send(reserva);
        } catch (err) {
            return response.status(400).send({message: "Error on register Reserva!"});
        }
    },
    async update(request, response, next) {
        const {
            idreserva,
            idgerenciador,
            tipo
        } = request.body;

        try {
            const reserva = await ReservasModel.update({
                idreserva,
                idgerenciador,
                tipo
            });
            console.log(reserva);
            return response.send(reserva);

        } catch (err) {
            return response.status(400).send({message: "Error on register Reserva!"});
        }
    },
    async get(request, response, next) {
        console.log("trying to get a reserva");
        try {
            console.log("here");
            const reserva = await ReservasModel.getAll();
            console.log(reserva);

            return response.send(reserva);
        } catch (err) {
            return response.status(400).send({message: "Error on get Reserva!"});
        }
    },

    async delete(request, response, next) {
        try {
            const { id } = request.params;
            const reserva = await ReservasModel.deleteId(id);
            return response.send(reserva);
            
        } catch (err) {
            return response.status(400).send({message: "Error on get Reserva!"});
        }
    }   
};

