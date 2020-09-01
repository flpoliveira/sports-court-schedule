const GerenciadoresModel = require("../model/GerenciadoresModel");
const jwt = require("jsonwebtoken");
const jwtKey = require("../config/authKey");

module.exports = {
    async login(request, response) {
        const {cpf, senha} = request.body;
        console.log(cpf, senha);
        console.log("someone is trying to login ...");

        GerenciadoresModel.login(cpf, senha, (err, user) => {
            if (err) {
                console.log("not worked!");
                console.log(err);
                response.status(401).send({token: null, message: "Invalid cpf or senha!"});
            } else {

                const userId = user.id;

                console.log("worked!");
                var token = jwt.sign({ userId }, jwtKey.secret, {
                    expiresIn: 86400 // 24 hours
                });

                response.status(200).send({
                    user,
                    token,
                    message: "Succesful autheticated!"
                });
            }
        });
    }
};

