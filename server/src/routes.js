const express = require("express");

const LoginController = require("./controllers/LoginController");
const GerenciadoresController = require("./controllers/GerenciadoresController");
const authJwt = require("./middlewares/authJwt");

const routes = express.Router();


routes.post("/login", LoginController.login);

routes.use(authJwt);
routes.post("/register", GerenciadoresController.register);

module.exports = routes; 