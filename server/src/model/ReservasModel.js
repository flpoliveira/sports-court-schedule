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
            const gerenciadores = await client.db("database").collection("gerenciadores").find({}).toArray();
            const usuarios = await client.db("database").collection("usuarios").find({}).toArray();
            const quadras = await client.db("database").collection("quadras").find({}).toArray();
            const arr = [];

            for (const reserva of reservas) {
               
                const gerenciador = gerenciadores.map((x) => {
                    if (reserva.acoes[reserva.acoes.length - 1].idgerenciador == x._id) {
                        return x;
                    }
                })[0]; 
                const usuario = usuarios.map((x) => {
                    if (reserva.idusuario == x._id) {
                        return x;
                    }
                })[0];
                
                const quadra = quadras.map((x) => {
                    if (reserva.idquadra == x._id) {
                        return x;
                    }
                })[0];
                const gerenciadorid = gerenciador._id ? gerenciador._id  : "";
                const cpf = gerenciador.cpf ? gerenciador.cpf : "";
                const nomecompleto = gerenciador.nomecompleto? gerenciador.nomecompleto : "";
                const usuarionome = usuario.nomecompleto ? usuario.nomecompleto  : "";
                const quadra = quadra.nome ? quadra.nome : "";
            
                arr.push({
                    ...reserva,
                    gerenciadorid,
                    id: reserva._id || "",
                    nomecompleto,
                    cpf,
                    tipo: reserva.acoes[reserva.acoes.length - 1].acao || "",
                    usuarionome,
                    quadra,
                });
                
            }

            return arr;

        } catch (error) {
            console.log(error);
            return {error};
        }
    }
};