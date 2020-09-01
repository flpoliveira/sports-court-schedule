import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { getReservaRequest, updateReservaRequest } from "store/modules/reserva/actions";
import {
    Row,
    Col,
    Button,
} from "reactstrap";
import { Link } from "react-router-dom";

import MaterialTable from "material-table";

const Reserva = () => {

    const dispatch = useDispatch();
    const reservas = useSelector(state => {
        return state.reserva.reserva;
    });
    const gerenciador = useSelector(state => {
        return state.auth.user.id;
    });

    React.useEffect(() => {
        dispatch(getReservaRequest());
    }, [dispatch]);

    return (
        <div className="content">
          <Row>
            <Col lg="12" md="12">
                <Row>
                    <Col lg="12" md="12">
                    
                    <div style={{ maxWidth: "100%" }}>
                            <MaterialTable
                                title={"Lista de Reservas"} 
                                columns={[
                                    
                                    {title: "Motivo", field: "motivo"},
                                    {title: "Data Hora Inicio", field: "datahorainicio"},
                                    {title: "Data Hora Fim", field: "datahorafim"},
                                    {title: "Reservante", field:"reservante"},
                                    {title: "Gerenciador", field:"gerenciador"},
                                    {title: "Acao do gerenciador", field:"acao"},
                                    {title: "Quadra", field:"quadra"}

                                ]}
                                actions={[
                                    rowData => ({
                                        icon: 'check',
                                        tooltip: 'Confirmar Reserva',
                                        onClick: (event, rowData) => {
                                            const reserva = {
                                                idreserva: rowData.id,
                                                idgerenciador: gerenciador,
                                                tipo: 2
                                            };
                                            dispatch(updateReservaRequest(reserva));
                                        },
                                        disabled: rowData.acao !== "Efetuou a reserva"
                                    }),
                                    rowData => ({
                                        icon: 'close',
                                        tooltip: 'Cancelar Reserva',
                                        onClick: (event, rowData) => {
                                            const reserva = {
                                                idreserva: rowData.id,
                                                idgerenciador: gerenciador,
                                                tipo: 3
                                            };
                                            dispatch(updateReservaRequest(reserva));
                                        },
                                        disabled: rowData.acao !== "Efetuou a reserva"
                                    }),
                                  ]}
                                data={
                                    reservas.map((reserva) => {
                                        const dtinicio = new Date(reserva.datahorainicio);
                                        const dtfim = new Date(reserva.datahorafim);

                                        let acao = "";
                                        switch(reserva.tipo) {
                                            case 2:
                                                acao = "Confirmou a presenca";
                                                break;
                                            case 3:
                                                acao = "Cancelou a reserva";
                                                break;
                                            default:
                                                acao = "Efetuou a reserva";
                                                break;
                                        }
                                        console.log(dtfim);
                                        return {
                                            id: reserva.id,
                                            motivo: reserva.motivo,
                                            datahorainicio: dtinicio.toLocaleDateString() + " " + dtinicio.toLocaleTimeString(),
                                            datahorafim: dtfim.toLocaleDateString() + " " + dtinicio.toLocaleTimeString(),
                                            reservante: reserva.usuarionome,
                                            gerenciador: reserva.nomecompleto,
                                            acao,
                                            quadra: reserva.quadra
                                        };
                                    })
                                        
                                }
                            />
                        </div>
                        
                    </Col>
                </Row>
                <Link to="/createreserva" style={{display: "flex", justifyContent: "center"}}>
                    <Button color="primary" style={{marginTop: "20px"}}>Adicionar uma reserva</Button>
                </Link>
            </Col>
          </Row>
        </div>
          
    );
}

export default Reserva;