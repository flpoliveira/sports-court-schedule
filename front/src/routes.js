import React from "react";

import history from "./history";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
import api from './services/api';
import { ConnectedRouter } from 'connected-react-router'

import Login from "./views/Login";
import Gerenciador from "./views/Gerenciador";
import CreateGerenciador  from "./views/Gerenciador/CreateGerenciador";
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
