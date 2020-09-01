import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { getGerenciadorRequest } from "store/modules/gerenciador/actions";
import {
    Row,
    Col,
    Button,
  } from "reactstrap";
import { Link } from "react-router-dom";

import MaterialTable from "material-table";

const Gerenciador = () => {

    const dispatch = useDispatch();
    const gerenciadores = useSelector(state => 
       state.gerenciador.gerenciador
    );

   

    React.useEffect(() => {
        dispatch(getGerenciadorRequest());
    }, [dispatch]);

    return (
        <div className="content">
            <Row>
                <Col lg="12" md="12">
                <div style={{ maxWidth: "100%" }}>
                        <MaterialTable
                            title={"Lista de Gerenciadores"} 
                            columns={[
                                {title: "CPF", field: "cpf"},
                                {title: "Nome Completo", field: "nomecompleto"},
                                {title: "Email", field: "email"},
                            ]}
                            data={
                                gerenciadores.map((gerenciador) => {
                                    return {
                                        cpf: gerenciador.cpf,
                                        nomecompleto: gerenciador.nomecompleto,
                                        email: gerenciador.email,
                                    }
                                })
                            }
                        />
                    </div>
                    
                </Col>
            </Row>
            <Link to="/creategerenciador" style={{display: "flex", justifyContent: "center"}}>
                <Button color="primary" style={{marginTop: "20px"}}>Adicionar um gerenciador</Button>
            </Link>
        </div>
          
    );
}

export default Gerenciador;