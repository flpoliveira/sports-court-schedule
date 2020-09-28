const client = require("../config/db");

module.exports = {
    async create(object) {
        try {
            const res = await client.db("database").collection("blocos").insertOne(object);
            res.ops[0].id = res.ops[0]._id;
            delete res.ops[0]._id;
            return res.ops[0];
        } catch (error) {
            return { error: "Falha ao cadastrar o bloco", message: error }
        }
    },

    async getAll() {
        try {
            const ret = await client.db("database").collection("blocos").find({}).toArray();
      
            return ret.map(e => {
              return {
                ...e,
                id: e._id,
              }
            });
        } catch (error) {
            return { error: "Falha ao listar os blocos", message: error }
        }
    },
};