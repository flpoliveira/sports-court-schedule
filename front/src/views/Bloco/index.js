import React, { useReducer } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getBlocoRequest } from "store/modules/bloco/actions";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
    Button,
    CardFooter,
  } from "reactstrap";
import { Link } from "react-router-dom";

import MaterialTable from "material-table";

const Bloco = () => {

    const dispatch = useDispatch();
    const blocos = useSelector(state => {
        return state.bloco.bloco
    });

    React.useEffect(() => {
        dispatch(getBlocoRequest());
    }, [dispatch]);

    return (
        <div className="content">
          <Row>
            <Col lg="12" md="12">
                <Row>
                    <Col lg="12" md="12">
                    <div style={{ maxWidth: "100%" }}>
                            <MaterialTable
                                title={"Lista de Blocos"} 
                                columns={[
                                    {title: "Nome", field: "nome"},
                                    {title: "Descricao", field: "descricao"},
                                ]}
                                data={
                                    blocos.map((bloco) => {
                                        return {
                                            nome: bloco.nome,
                                            descricao: bloco.descricao,
                                        }
                                    })
                                }
                            />
                        </div>
                        
                    </Col>
                </Row>
                <Link to="/createbloco" style={{display: "flex", justifyContent: "center"}}>
                    <Button color="primary" style={{marginTop: "20px"}}>Adicionar um bloco</Button>
                </Link>
            </Col>
          </Row>
        </div>
          
    );
}

export default Bloco;