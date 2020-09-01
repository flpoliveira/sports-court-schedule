const client = require("../config/db");

module.exports = {
    async create(object) {
        const { nomecompleto, email, cpf } = object;

        try {
            const query = `INSERT INTO Usuarios (nomecompleto, email, cpf) 
            VALUES ($1, $2,  $3) RETURNING *`;
            const res = await client.query(query,[nomecompleto, email, cpf]);
            console.log(res, query);
            return res.rows[0];
        } catch (error) {
            return {error};
        }
       
    },

    async getAll() {
        try {
            const query = `SELECT * FROM Usuarios`;
            const res = await client.query(query);
            return res.rows;
        } catch (error) {
            return {error};
        }
    },

    async getId(id) {
        try {
            const query = `SELECT * FROM Usuarios WHERE id = $1`;
            const res = await client.query(query, [id]);

            return res.rows;
        } catch (error) {
            return {error};
        }
    },

    async delete(id) {
        try {
            const query = `DELETE FROM Usuarios WHERE id = $1`;
            const res = await client.query(query, [id]);

            return res.rows;
        } catch (error) {
            return {error};
        }
    },

};