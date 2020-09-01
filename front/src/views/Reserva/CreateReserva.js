import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Input,
  Form,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { newReservaRequest } from "store/modules/reserva/actions";
import { getQuadraRequest } from "store/modules/quadra/actions";
import { getUsuarioRequest } from "store/modules/usuario/actions";


const CreateReserva = () => {
  const dispatch = useDispatch();
  const [datahorainicio, setDataHoraInicio] = React.useState("");
  const [datahorafim, setDataHoraFim] = React.useState("");
  const [motivo, setMotivo] = React.useState("");
  const [idusuario, setIdUsuario] = React.useState("1");
  const [idquadra, setIdQuadra] = React.useState("1");

  const quadras = useSelector(state => {
    return state.quadra.quadra
  });

  const usuarios = useSelector(state => {
    return state.usuario.usuario
  });

  const gerenciador = useSelector(state => {
    return state.auth.user.id;
  });

  const submitForm = () => {
    const dtinicio = datahorainicio.replace("T", " ");
    const dtfim = datahorafim.replace("T", " ");
    const reserva = {
      datahorainicio: dtinicio,
      datahorafim: dtfim,
      ativo: true, 
      motivo, 
      idusuario: Number(idusuario), 
      idquadra: Number(idquadra), 
      idgerenciador: gerenciador
    }
    console.log(reserva);
    dispatch(newReservaRequest(reserva));
  }

  React.useEffect(() => {
    dispatch(getQuadraRequest());
    dispatch(getUsuarioRequest());
  }, [dispatch]); 

  return (
    <>
      <div className="content">
        <Row>
          <Col lg="12" md="12">
            <Card style={{
              padding: "10px"
            }}>
              <CardHeader>
                <CardTitle tag="h4">
                  Novo Gerenciador
                  <Col size={6}>  
                    <Link to="/reserva">
                        <Button 
                          color="primary"
                          style={{
                            marginTop: "-50px",
                            marginLeft: "90%"
                          }}
                        
                        >Voltar</Button>
                    </Link>
                  </Col>
                
                </CardTitle>
              </CardHeader>
              <CardBody
               
              >
                <Form>
                  <FormGroup>
                    <Label for="name">Data e Hora Inicio</Label>
                    <Input type="datetime-local" id="name" placeholder="Data e Hora de Inicio" onChange={(e) => setDataHoraInicio(e.target.value)}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="dthorafim">Data e Hora Fim</Label>
                    <Input type="datetime-local" id="dthorafim" placeholder="Data e Hora de Fim" onChange={(e) => setDataHoraFim(e.target.value)}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="motivo">Motivo</Label>
                    <Input type="text" id="motivo" placeholder="Motivo" onChange={(e) => setMotivo(e.target.value)}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleSelect">Selecione uma quadra</Label>
                    <Input type="select" name="select" id="exampleSelect"
                      onChange={(e) =>
                      {
                        console.log(e.target.value);
                        setIdQuadra(e.target.value);
                      }}
                    >
                     {quadras.map((quadra, i) => (
                       <option key={`${quadra.id}usuario`} value={quadra.id}>{`${quadra.nome} - ${quadra.descricao}`}</option>
                     ))}
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleSelect2">Selecione um usuario</Label>
                    <Input type="select" name="select" id="exampleSelect2"
                      onChange={(e) =>
                      {
                        console.log(e.target.value);
                        setIdUsuario(e.target.value);
                      }}
                    >
                     {usuarios.map((usuario, i) => (
                       <option key={`${usuario.id}usuario`} value={usuario.id}>{`${usuario.nomecompleto} - ${usuario.cpf}`}</option>
                     ))}
                    </Input>
                  </FormGroup>
                </Form>
                <Col 
                  size={6}
                  style={{
                    width: "100%",
                    display: "flex",
                    textAlign: "center",
                    justifyContent: "center"
                  }}
                >  
                  <Button onClick={() => submitForm()} color="success">Enviar</Button>
                </Col>
               
               
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CreateReserva;
