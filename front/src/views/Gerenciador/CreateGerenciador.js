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
import { useDispatch } from "react-redux";
import { newGerenciadorRequest } from "store/modules/gerenciador/actions";


const CreateGerenciador = () => {
  const dispatch = useDispatch();
  const [nomecompleto, setNomeCompleto] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [cpf, setCpf] = React.useState("");
  const [ehAdmin, setEhAdmin] = React.useState(false);

  const submitForm = () => {
    const gerenciador = {
        nomecompleto, email, senha, cpf, ehAdmin 
    }
    dispatch(newGerenciadorRequest(gerenciador));
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
                <CardTitle tag="h4">Novo Gerenciador</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="name">Nome Completo</Label>
                    <Input type="text" name="nome" id="name" placeholder="Nome completo" onChange={(e) => setNomeCompleto(e.target.value)}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="cpf">CPF</Label>
                    <Input type="text" name="cpf" id="cpf" placeholder="Cpf" onChange={(e) => setCpf(e.target.value)}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input type="email" name="email" id="exampleEmail" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Senha</Label>
                    <Input type="password" name="password" id="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)}/>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input type="checkbox" 
                        onChange={(e) =>{
                          if (e.target.checked) {
                            setEhAdmin(true);
                          } else {
                            setEhAdmin(false);
                          }
                        }}
                      />{' '}
                      O Gerenciador eh admin
                    </Label>
                  </FormGroup>

                  

                </Form>
                <Button style={{marginLeft: "90%"}} onClick={() => submitForm()} color="success">Enviar</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CreateGerenciador;
