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
            return response.send(reserva);

        } catch (err) {
            return response.status(400).send({message: "Error on register Reserva!"});
        }
    },
    async get(request, response, next) {
        try {

            const { id } = request.query;
            let reserva = null;
            if (typeof id === "undefined") {
                reserva = await ReservasModel.getAll();
            } else {
                reserva = await ReservasModel.getId(id);
            }
            

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

