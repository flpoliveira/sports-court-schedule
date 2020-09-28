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
import { newQuadraRequest } from "store/modules/quadra/actions";
import { getBlocoRequest } from "store/modules/bloco/actions";


const CreateQuadra = () => {
  const dispatch = useDispatch();
  const [nome, setNome] = React.useState("");
  const [descricao, setDescricao] = React.useState("");
  const [idbloco, setIdBloco] = React.useState("");

  const blocos = useSelector(state => {
    return state.bloco.bloco
  });

  const submitForm = () => {
    const quadra = {
        nome, descricao, idbloco
    }
    dispatch(newQuadraRequest(quadra));
  }

  React.useEffect(() => {
    dispatch(getBlocoRequest());
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
                    <Link to="/quadra">
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
                    <Input type="text" name="nome" id="name" placeholder="Nome da quadra" onChange={(e) => setNome(e.target.value)}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="cpf">Descricao</Label>
                    <Input type="text" name="cpf" id="cpf" placeholder="Descricao" onChange={(e) => setDescricao(e.target.value)}/>
                  </FormGroup>
                  
                  <FormGroup>
                    <Label for="exampleSelect">Selecione um bloco</Label>
                    <Input type="select" name="select" id="exampleSelect"
                      onChange={(e) =>
                      {
                        console.log(e.target.value);
                        setIdBloco(e.target.value);
                      }}
                    >
                     {blocos.map((bloco, i) => (
                       <option key={bloco.id} value={bloco.id}>{`${bloco.nome} - ${bloco.descricao}`}</option>
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

export default CreateQuadra;
