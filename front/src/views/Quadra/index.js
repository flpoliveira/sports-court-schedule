import React, { useReducer } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getQuadraRequest } from "store/modules/quadra/actions";
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

const Quadra = () => {

    const dispatch = useDispatch();
    const quadras = useSelector(state => {
        return state.quadra.quadra
    });

    React.useEffect(() => {
        dispatch(getQuadraRequest());
    }, [dispatch]);

    return (
        <div className="content">
          <Row>
            <Col lg="12" md="12">
                <Row>
                    <Col lg="12" md="12">
                    <div style={{ maxWidth: "100%" }}>
                            <MaterialTable
                                title={"Lista de Quadras"} 
                                columns={[
                                    {title: "Nome", field: "nome"},
                                    {title: "Descricao", field: "descricao"},
                                    {title: "Bloco", field: "bloconome"},
                                ]}
                                data={
                                    quadras.map((quadra) => {
                                        return {
                                            nome: quadra.nome,
                                            descricao: quadra.descricao,
                                            bloconome: quadra.bloconome,
                                        }
                                    })
                                }
                            />
                        </div>
                        
                    </Col>
                </Row>
                <Link to="/createquadra" style={{display: "flex", justifyContent: "center"}}>
                    <Button color="primary" style={{marginTop: "20px"}}>Adicionar uma quadra</Button>
                </Link>
            </Col>
          </Row>
        </div>
          
    );
}

export default Quadra;