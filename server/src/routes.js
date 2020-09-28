
const express = require("express");

const LoginController = require("./controllers/LoginController");
const GerenciadoresController = require("./controllers/GerenciadoresController");
const BlocosController = require("./controllers/BlocosController");
const QuadrasController = require("./controllers/QuadrasController");
const UsuariosController = require("./controllers/UsuariosController");
const ReservasController = require("./controllers/ReservasController");
const authJwt = require("./middlewares/authJwt");

const routes = express.Router();


routes.post("/login", LoginController.login);
routes.post("/gerenciador", GerenciadoresController.create);

routes.use(authJwt);
routes.get("/gerenciador", GerenciadoresController.get);

routes.get("/bloco", BlocosController.get);
routes.post("/bloco", BlocosController.create);

routes.get("/quadra", QuadrasController.get);
routes.post("/quadra", QuadrasController.create);

routes.get("/usuario", UsuariosController.get);
routes.post("/usuario", UsuariosController.create);

routes.get("/reserva", ReservasController.get);
routes.post("/reserva", ReservasController.create);
routes.post("/reservaupdate", ReservasController.update);

module.exports = routes; 