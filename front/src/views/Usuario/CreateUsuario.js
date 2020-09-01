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
import { useDispatch } from "react-redux";
import { newUsuarioRequest } from "store/modules/usuario/actions";


const CreateUsuario = () => {
  const dispatch = useDispatch();
  const [nomecompleto, setNomeCompleto] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [cpf, setCpf] = React.useState("");

  const submitForm = () => {
    const usuario = {
        nomecompleto, email, cpf 
    }
    dispatch(newUsuarioRequest(usuario));
  }

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
                    <Link to="/usuario">
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
                    <Label for="name">Nome</Label>
                    <Input type="text" name="nome" id="name" placeholder="Nome Completo" onChange={(e) => setNomeCompleto(e.target.value)}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Nome</Label>
                    <Input type="email" name="email" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="cpf">Cpf</Label>
                    <Input type="text" name="cpf" id="cpf" placeholder="CPF" onChange={(e) => setCpf(e.target.value)}/>
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

export default CreateUsuario;
