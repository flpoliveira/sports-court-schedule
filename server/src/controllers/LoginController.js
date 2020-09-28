const GerenciadoresModel = require("../model/GerenciadoresModel");
const jwt = require("jsonwebtoken");
const jwtKey = require("../config/authKey");

module.exports = {
    async login(request, response) {
        const {cpf, senha} = request.body;
        console.log(cpf, senha);
        console.log("someone is trying to login ...");

        const user = await GerenciadoresModel.login(cpf, senha);
        console.log(user);
        if (!user) {
            response.status(401).send({token: null, message: "Invalid cpf or senha!"});
        } else {
            var token = jwt.sign({ userId: user.id }, jwtKey.secret, {
                expiresIn: 86400 // 24 hours
            });
            response.status(200).send({
                user,
                token,
                message: "Succesful autheticated!"
            });
        }
       
    }
};

