const client = require("../config/db");

module.exports = {
    async create(object) {
        const { nomecompleto, email, cpf } = object;
        try {

            const aux = await client.db("database").collection("usuarios").insertOne(object);
            aux.ops[0].id = aux.ops[0]._id;
            delete aux.ops[0]._id;
            return aux.ops[0];

        } catch (error) {
            return {error};
        }
    },

    async getAll() {
        try {
            const ret = await client.db("database").collection("usuarios").find({}).toArray();
      
            return ret.map(e => {
              return {
                ...e,
                id: e._id,
              }
            });
        } catch (error) {
            return {error};
        }
    },

};