const client = require("../config/db");

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
    
    async register(nomeCompleto, email, senha, cpf, ehAdmin, callback) {
        const query = `INSERT INTO Gerenciadores (nomeCompleto, email, senha, cpf, ehAdmin) 
            VALUES ($1, $2,  $3, $4, $5)`;
        client.query(query,[nomeCompleto, email, senha, cpf, ehAdmin], (err, res) => {
                if(err) {
                    callback(err);
                } 
                    
                callback("Gerenciador cadastrado!");
                client.end();
            }
        );
    }
};