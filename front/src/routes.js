import React from "react";

import history from "./history";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
import api from './services/api';
import { ConnectedRouter } from 'connected-react-router'

import Login from "./views/Login";
import Gerenciador from "./views/Gerenciador";
import CreateGerenciador  from "./views/Gerenciador/CreateGerenciador";
import Bloco from "./views/Bloco/";
import CreateBloco from "./views/Bloco/CreateBloco";
import Quadra from "./views/Quadra/";
import CreateQuadra from "./views/Quadra/CreateQuadra";
import Usuario from "./views/Usuario";
import CreateUsuario from "./views/Usuario/CreateUsuario";
import Reserva from "./views/Reserva";
import CreateReserva from "./views/Reserva/CreateReserva";
import AdminLayout from "layouts/Admin.jsx";

import { RiAdminLine } from "react-icons/ri";

const routes = [
  {
    path: "",
    name: "Gerenciadores",
    icon: () => <RiAdminLine size={15} />,
    component: Gerenciador,
    layout: "/gerenciador"
  },
  {
    path: "",
    name: "Blocos",
    icon: () => <RiAdminLine size={15} />,
    component: Bloco,
    layout: "/bloco"
  },
  {
    path: "",
    name: "Quadras",
    icon: () => <RiAdminLine size={15} />,
    component: Quadra,
    layout: "/quadra"
  },
  {
    path: "",
    name: "Usuarios",
    icon: () => <RiAdminLine size={15} />,
    component: Usuario,
    layout: "/usuario"
  },
  {
    path: "",
    name: "Reservas",
    icon: () => <RiAdminLine size={15} />,
    component: Reserva,
    layout: "/reserva"
  },
];

const Routes = () => {
  const signed = useSelector(state => state.auth.signed);
  const token = useSelector(state => state.auth.token);
  console.log(signed, token, "signed and token");

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }

  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/">
          {signed ? <Redirect to="/admin"  /> : <Redirect to="/login"  />}
        </Route>
        {signed ? (
          <>
            <Route exact path="/admin" render={props => <AdminLayout {...props} content={Gerenciador}/>} />
            <Route exact path="/gerenciador" render={props => <AdminLayout {...props} content={Gerenciador} />} />
            <Route exact path="/creategerenciador" render={props => <AdminLayout {...props} content={CreateGerenciador} />} />
            <Route exact path="/bloco" render={props => <AdminLayout {...props} content={Bloco} />} />
            <Route exact path="/createbloco" render={props => <AdminLayout {...props} content={CreateBloco} />} />
            <Route exact path="/quadra" render={props => <AdminLayout {...props} content={Quadra} />} />
            <Route exact path="/createquadra" render={props => <AdminLayout {...props} content={CreateQuadra} />} />
            <Route exact path="/usuario" render={props => <AdminLayout {...props} content={Usuario} />} />
            <Route exact path="/createusuario" render={props => <AdminLayout {...props} content={CreateUsuario} />} />
            <Route exact path="/reserva" render={props => <AdminLayout {...props} content={Reserva} />} />
            <Route exact path="/createreserva" render={props => <AdminLayout {...props} content={CreateReserva} />} />

            
          </>
        ) : (
          <>
            <Route path="/login" component={Login} />
          </>
        )}
        
      </Switch>
    </ConnectedRouter>
  );
};

export {
  Routes,
  history,
};

export default routes;
