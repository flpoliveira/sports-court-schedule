const { ObjectId } = require('mongodb');
const client = require("../config/db");

module.exports = {
    async create(object) {
        const { 
            datahorainicio,
            datahorafim,
            ativo,
            motivo,
            idusuario,
            idquadra,
            idgerenciador,
        } = object;
        /**
         * 1 - Cadastro
         * 2 - Confirmacao
         * 3 - Cancelamento
         */
        try {
            console.log(object);
            const res = await client.db("database").collection("reservas").insertOne({
                idusuario,
                idquadra,
                motivo,
                ativo,
                datahorainicio,
                datahorafim,
                acoes: [{
                    idgerenciador,
                    acao: 1,
                }]
            });

            return res;
        } catch (error) {
            return {error};
        }
       
    },
    async update(object){
        const {
            idreserva,
            idgerenciador,
            tipo
        } = object;
        console.log(object);
        try {
           
            const reserva = await client.db("database").collection("reservas").findOne({_id: ObjectId(idreserva)});
            const myquery = { _id: ObjectId(idreserva) };
            const newvalues = { $set: {acoes: [...reserva.acoes, { idgerenciador, acao: tipo}] } };
            const res = await client.db("database").collection("reservas").updateOne(myquery, newvalues);
            return res;
        } catch(error) {
            return {error};
        }
    },
    async getAll() {
        try {
            const reservas = await client.db("database").collection("reservas").find({}).toArray();
           

            const arr = [];

            for (const reserva of reservas) {
                const gerenciador = await client.db("database").collection("gerenciadores").findOne({_id: ObjectId(reserva.acoes[reserva.acoes.length - 1].idgerenciador)});
                const usuario = await client.db("database").collection("usuarios").findOne({_id: ObjectId(reserva.idusuario)});
                const quadra = await client.db("database").collection("quadras").findOne({_id: ObjectId(reserva.idquadra)});
                console.log(reserva.acoes.length, reserva.acoes.length - 1);
                console.log(reserva.acoes[ reserva.acoes.length - 1]);
                arr.push({
                    ...reserva,
                    gerenciadorid: gerenciador._id || "",
                    id: reserva._id || "",
                    nomecompleto: gerenciador.nomecompleto || "",
                    cpf: gerenciador.cpf || "",
                    tipo: reserva.acoes[reserva.acoes.length - 1].acao || "",
                    usuarionome: usuario.nomecompleto || "",
                    quadra: quadra.nome || "",
                });
            }
         

            return arr;
        } catch (error) {
            return {error};
        }
    },

    async getId(id) {
        try {
            const query = `SELECT si.idgerenciador as gerenciadorid, Reservas.id, si.nomecompleto, si.cpf, si.tipo, Reservas.datahorainicio, 
            Reservas.datahorafim, Reservas.motivo,  Usuarios.nomecompleto as usuarionome, Quadras.nome as quadra FROM Reservas
            JOIN Usuarios ON Reservas.idusuario = Usuarios.id
            JOIN Quadras ON Reservas.idquadra = Quadras.id
            LEFT JOIN LATERAL ( SELECT * FROM Gerenciadores_Reservas 
            JOIN Gerenciadores ON Gerenciadores_Reservas.idGerenciador = Gerenciadores.id
            WHERE Reservas.id = Gerenciadores_Reservas.idReserva 
             ORDER BY Gerenciadores_Reservas.id DESC LIMIT 1) as si ON si.idreserva = Reservas.id
            WHERE Rerservas.id = $1`;
            const res = await client.query(query, [id]);

            return res.rows;
        } catch (error) {
            return {error};
        }
    },

};