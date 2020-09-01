import React, { useReducer } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getGerenciadorRequest } from "store/modules/gerenciador/actions";
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
import { BiCheckCircle } from "react-icons/bi";
import { RiCloseCircleLine } from "react-icons/ri"

const Gerenciador = () => {

    const dispatch = useDispatch();
    const gerenciadores = useSelector(state => state.gerenciador.gerenciador);

    React.useEffect(() => {
        dispatch(getGerenciadorRequest());
    }, [dispatch]);

    return (
        <div className="content">
          <Row>
            <Col lg="12" md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4" style={{margin: "10px 10px"}}>Gerenciadores</CardTitle>
                </CardHeader>
                <CardBody>
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>CPF</th>
                                <th>Nome completo</th>
                                <th>email</th>
                                <th>administrador</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gerenciadores.map((gerenciador, i) => (
                                <tr key={i}>
                                    <th scope="row">{i+1}</th>
                                    <td>{gerenciador.cpf}</td>
                                    <td>{gerenciador.nomecompleto}</td>
                                    <td>{gerenciador.email}</td>
                                    <td>{gerenciador.ehadmin ? <BiCheckCircle /> : <RiCloseCircleLine />}</td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </Table>
                </CardBody>
                <CardFooter>
                    <Link to="/creategerenciador" style={{margin: "10px 10px"}}>
                        <Button color="primary">Adicionar um gerenciador</Button>
                    </Link>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
          
    );
}

export default Gerenciador;