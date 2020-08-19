const express = require("express");
const {response} = express;
const LoginController = require("./controllers/LoginController");
const RegisterController = require("./controllers/RegisterController");
const authJwt = require("./middlewares/authJwt");

const routes = express.Router();


routes.get("/login", LoginController.login);

routes.use(authJwt);
routes.post("/register", RegisterController.register);

module.exports = routes;