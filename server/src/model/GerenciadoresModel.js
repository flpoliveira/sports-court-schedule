const client = require("../config/db");

module.exports = {
    async login (cpf, senha) {
        try {
            console.log(cpf, senha);
            const res = await client.db("database").collection("gerenciadores").findOne({cpf, senha});

            console.log(res, "here");
            if (res === null) {
                return false;
            }

            return {
                ...res,
                id: res._id
            };

        } catch (error) {
            return false;
        }
    },
    
    async create(object) {
        const { senha, cpf} = object;
        
        try {

            const aux = await client.db("database").collection("gerenciadores").insertOne(object);
            aux.ops[0].id = aux.ops[0]._id;
            delete aux.ops[0]._id;
            return aux.ops[0];

        } catch (error) {
            return {error};
        }
       
    },

    async getAll() {
        try {
            const ret = await client.db("database").collection("gerenciadores").find({}).toArray();
      
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