const client = require("../config/db");
const { update } = require("../controllers/GerenciadoresController");

module.exports = {
    async login(cpf, senha, callback) {
        const query = `SELECT id, nomeCompleto, email, cpf, ehAdmin FROM Gerenciadores WHERE cpf = $1 AND senha = $2`;
        client.query(query, [cpf, senha], 
            (err, res) => {
                if(err) {
                    callback(err);
                } else {
                    var rows = res.rowCount;
                    if (rows == 0) {
                        err = "CPF ou senha incorreto!";
                    }
                    callback(err, res.rows[0]);
                }
                client.end();
            }
        );
    },
    
    async create(object) {
        const {nomeCompleto, email, senha, cpf, ehAdmin} = object;

        try {
            const query = `INSERT INTO Gerenciadores (nomeCompleto, email, senha, cpf, ehAdmin) 
            VALUES ($1, $2,  $3, $4, $5) RETURNING *`;
            const res = await client.query(query,[nomeCompleto, email, senha, cpf, ehAdmin]);
            console.log(res, query);
            return res.rows[0];
        } catch (error) {
            return {error};
        }
       
    },

    async getAll() {
        try {
            const query = `SELECT * FROM Gerenciadores`;
            const res = await client.query(query);

            return res.rows;
        } catch (error) {
            return {error};
        }
    },

    async getId(id) {
        try {
            const query = `SELECT * FROM Gerenciadores WHERE id = $1`;
            const res = await client.query(query, [id]);

            return res.rows;
        } catch (error) {
            return {error};
        }
    },

    async delete(id) {
        try {
            const query = `DELETE FROM Gerenciadores WHERE id = $1`;
            const res = await client.query(query, [id]);

            return res.rows;
        } catch (error) {
            return {error};
        }
    },

    async update(object) {
        try {
            const { id, nomeCompleto, email, senha, cpf, ehAdmin } = object;

            const query = `UPDATE Gerenciadores SET nomeCompleto = $1, email = $2, senha = $3, cpf = $4, ehAdmin = $5 WHERE id = $6`;
            const res = await client.query(query, [nomeCompleto, email, senha, cpf, ehAdmin, id]);

            return res.rows;
        } catch (error) {
            return {error};
        }
    }
};