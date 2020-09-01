const client = require("../config/db");

module.exports = {
    async create(object) {
        const { nome, descricao, idbloco } = object;

        try {
            const query = `INSERT INTO Quadras (nome, descricao, idbloco) 
            VALUES ($1, $2, $3) RETURNING *`;
            const res = await client.query(query,[nome, descricao, idbloco]);
            console.log(res, query);
            return res.rows[0];
        } catch (error) {
            return {error};
        }
       
    },

    async getAll() {
        try {
            const query = `SELECT Quadras.id, Quadras.nome, Quadras.descricao, Blocos.nome as Bloconome 
            FROM Quadras
            JOIN Blocos ON Quadras.idbloco = Blocos.id `;
            const res = await client.query(query);

            return res.rows;
        } catch (error) {
            return {error};
        }
    },

    async getId(id) {
        try {
            const query = `SELECT * FROM Quadras WHERE id = $1`;
            const res = await client.query(query, [id]);

            return res.rows;
        } catch (error) {
            return {error};
        }
    },

    async delete(id) {
        try {
            const query = `DELETE FROM Quadras WHERE id = $1`;
            const res = await client.query(query, [id]);

            return res.rows;
        } catch (error) {
            return {error};
        }
    },

};