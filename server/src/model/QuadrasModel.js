const client = require("../config/db");

module.exports = {
    async create(object) {
        try {
            const res = await client.db("database").collection("quadras").insertOne(object);
            res.ops[0].id = res.ops[0]._id;
            delete res.ops[0]._id;
            return res.ops[0];
        } catch (error) {
            return { error: "Falha ao cadastrar a quadra", message: error }
        }
    },

    async getAll() {
        try {
            const quadras = await client.db("database").collection("quadras").find({}).toArray();
            const blocos = await client.db("database").collection("blocos").find({}).toArray();
            const arr = [];

            for (const quadra of quadras) {
                console.log(quadra);
                for (const bloco of blocos) {
                    console.log(bloco);
                    if (quadra.idbloco == bloco._id) {
                        arr.push({
                            ...quadra,
                            id: quadra._id,
                            bloconome: bloco.nome
                        });
                        break;
                    }
                }
            }
            return arr;
        } catch (error) {
            return { error: "Falha ao listar os quadras", message: error }
        }
    },

};