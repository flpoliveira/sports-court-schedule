import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { getUsuarioRequest } from "store/modules/usuario/actions";
import {
    Row,
    Col,
    Button,
} from "reactstrap";
import { Link } from "react-router-dom";

import MaterialTable from "material-table";

const Usuario = () => {

    const dispatch = useDispatch();
    const usuarios = useSelector(state => {
        return state.usuario.usuario
    });

    React.useEffect(() => {
        dispatch(getUsuarioRequest());
    }, [dispatch]);

    return (
        <div className="content">
          <Row>
            <Col lg="12" md="12">
                <Row>
                    <Col lg="12" md="12">
                    <div style={{ maxWidth: "100%" }}>
                            <MaterialTable
                                title={"Lista de Usuarios"} 
                                columns={[
                                    {title: "CPF", field: "cpf"},
                                    {title: "Nome Completo", field: "nomecompleto"},
                                    {title: "Email", field: "email"},
                                ]}
                                data={
                                    usuarios.map((usuario) => {
                                        return {
                                            cpf: usuario.cpf,
                                            nomecompleto: usuario.nomecompleto,
                                            email: usuario.email,
                                        }
                                    })
                                }
                            />
                        </div>
                        
                    </Col>
                </Row>
                <Link to="/createusuario" style={{display: "flex", justifyContent: "center"}}>
                    <Button color="primary" style={{marginTop: "20px"}}>Adicionar um usuario</Button>
                </Link>
            </Col>
          </Row>
        </div>
          
    );
}

export default Usuario;