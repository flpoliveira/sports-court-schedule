const client = require("../config/db");

module.exports = {
    async create(object) {
        const { nome, descricao } = object;

        try {
            const query = `INSERT INTO Blocos (nome, descricao) 
            VALUES ($1, $2) RETURNING *`;
            const res = await client.query(query,[nome, descricao]);
            console.log(res, query);
            return res.rows[0];
        } catch (error) {
            return {error};
        }
       
    },

    async getAll() {
        try {
            const query = `SELECT * FROM Blocos`;
            const res = await client.query(query);

            return res.rows;
        } catch (error) {
            return {error};
        }
    },

    async getId(id) {
        try {
            const query = `SELECT * FROM Blocos WHERE id = $1`;
            const res = await client.query(query, [id]);

            return res.rows;
        } catch (error) {
            return {error};
        }
    },

    async delete(id) {
        try {
            const query = `DELETE FROM Blocos WHERE id = $1`;
            const res = await client.query(query, [id]);

            return res.rows;
        } catch (error) {
            return {error};
        }
    },

};