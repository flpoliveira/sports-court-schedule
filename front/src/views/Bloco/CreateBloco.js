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
import { newBlocoRequest } from "store/modules/bloco/actions";


const CreateBloco = () => {
  const dispatch = useDispatch();
  const [nome, setNome] = React.useState("");
  const [descricao, setDescricao] = React.useState("");

  const submitForm = () => {
    const bloco = {
        nome, descricao 
    }
    dispatch(newBlocoRequest(bloco));
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
                    <Link to="/bloco">
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
                    <Input type="text" name="nome" id="name" placeholder="Nome do bloco" onChange={(e) => setNome(e.target.value)}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="cpf">Descricao</Label>
                    <Input type="text" name="cpf" id="cpf" placeholder="Descricao" onChange={(e) => setDescricao(e.target.value)}/>
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

export default CreateBloco;
