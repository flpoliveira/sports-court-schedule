const GerenciadoresModel = require("./model/GerenciadoresModel");
const BlocosModel = require("./model/BlocosModel");
const QuadrasModel = require("./model/QuadrasModel");

// const a = GerenciadoresModel.create({
//     nomecompleto: "admin",
//     email: "admin@admin.com",
//     senha: "admin",
//     cpf:"12345678901",
//     ehAdmin: true,
// });


// const b = GerenciadoresModel.create({
//     nomecompleto: "bolsista",
//     email: "bolsista@admin.com",
//     senha: "bolsista",
//     cpf: "12345678902",
//     ehAdmin: true,
// });

const c = BlocosModel.create({
    nome: "Bloco B",
    descricao: "Quadras de Basquete"
});

 console.log(c);