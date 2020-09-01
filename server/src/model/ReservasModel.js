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
        } = object;
        /**
         * 1 - Cadastro
         * 2 - Confirmacao
         * 3 - Cancelamento
         */
        try {
           let query = `INSERT INTO Reservas(datahorainicio, datahorafim, ativo, motivo, idusuario, idquadra) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
            const res = await client.query(query, [datahorainicio, datahorafim, ativo, motivo, idusuario, idquadra]);
            const reserva = res.rows[0];
            if (reserva) {
                const {
                    idgerenciador
                } = object;

                query = `INSERT INTO Gerenciadores_Reservas(idgerenciador, idreserva, tipo)
                    VALUES($1, $2, $3)`;
                const gerenciadorReserva = await client.query(query, [idgerenciador, reserva.id, 1]);

                return {...reserva, ... gerenciadorReserva.rows[0]}
            }

            return {error: "Cant insert Reserva"};
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

        try {
            const query = `INSERT INTO Gerenciadores_Reservas(idgerenciador, idreserva, tipo)
            VALUES ($1, $2, $3)`;

            const res = await client.query(query,[idgerenciador, idreserva, tipo]);
            console.log(res, query);
            return res.rows[0];
        } catch(error) {
            return {error};
        }
    },
    async getAll() {
        try {
            const query = `SELECT Gerenciadores.nomecompleto, Gerenciadores.cpf, Gerenciadores_Reservas.tipo, Reservas.datahorainicio, 
                Reservas.datahorafim, Reservas.motivo,  Usuarios.nomecompleto as usuarionome, Quadras.nome as quadra FROM Reservas
                JOIN Usuarios ON Reservas.idusuario = Usuarios.id
                JOIN Quadras ON Reservas.idquadra = Quadras.id
                LEFT JOIN Gerenciadores_Reservas ON Reservas.id = Gerenciadores_Reservas.idReserva 
                LEFT JOIN Gerenciadores ON Gerenciadores_Reservas.idGerenciador = Gerenciadores.id
                 ORDER BY Gerenciadores_Reservas.id DESC`;
            const res = await client.query(query);

            return res.rows;
        } catch (error) {
            return {error};
        }
    },

    async getId(id) {
        try {
            const query = `SELECT Gerenciadores.nomecompleto, Gerenciadores.cpf, Gerenciadores_Reservas.tipo, Reservas.datahorainicio, 
            Reservas.datahorafim, Reservas.motivo,  Usuarios.nomecompleto as usuarionome, Quadras.nome as quadra FROM Reservas
            JOIN Usuarios ON Reservas.idusuario = Usuarios.id
            JOIN Quadras ON Reservas.idquadra = Quadras.id
            LEFT JOIN Gerenciadores_Reservas ON Reservas.id = Gerenciadores_Reservas.idReserva 
            LEFT JOIN Gerenciadores ON Gerenciadores_Reservas.idGerenciador = Gerenciadores.id
            WHERE Reservas.id = $1
             ORDER BY Gerenciadores_Reservas.id DESC`;
            const res = await client.query(query, [id]);

            return res.rows;
        } catch (error) {
            return {error};
        }
    },

};