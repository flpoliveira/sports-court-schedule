
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

routes.use(authJwt);
routes.get("/gerenciador", GerenciadoresController.get);
routes.post("/gerenciador", GerenciadoresController.create);

routes.get("/blocos", BlocosController.get);
routes.post("/blocos", BlocosController.create);

routes.get("/quadras", QuadrasController.get);
routes.post("/quadras", QuadrasController.create);

routes.get("/usuarios", UsuariosController.get);
routes.post("/usuarios", UsuariosController.create);

routes.get("/reservas", ReservasController.get);
routes.post("/reservas", ReservasController.create);
routes.post("/reservasupdate", ReservasController.update);

module.exports = routes; 