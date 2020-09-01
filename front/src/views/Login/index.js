import React from "react";
import { Button, FormGroup, Label, Input, } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { signInRequest } from "../../store/modules/auth/actions";

const Login = (props) => {
  const dispatch = useDispatch();
  const [cpf, setCpf] = React.useState("");
  const [senha, setSenha] = React.useState("");

  const sendcpf = () => {
    dispatch(signInRequest(cpf, senha));
  }
  return (
      <div
        style={{
          width: "100%",
          minHeight: "700px",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "url(https://images.unsplash.com/photo-1595735927257-c45301611ef9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)",
          backgroundSize: "cover",
          backgroundColor: "#FF0000"
        }}
      >
        <div style={{ maxWidth: 500, padding: 30, backgroundColor: "#fff", borderRadius: 10 }}>
          <FormGroup>
            <Label for="exampleEmail">CPF</Label>
            <Input type="text" onChange={(e) => setCpf(e.target.value)} value={cpf} style={{ color: "#000" }}/>
          </FormGroup>
          <FormGroup>
            <Label for="exampleSenha">Senha</Label>
            <Input type="password" onChange={(e) => setSenha(e.target.value)} value={senha} style={{ color: "#000" }}/>
          </FormGroup>
          <Button style={{ width: "100%" }} onClick={() => sendcpf()}>Entrar</Button>
        </div>
      
      </div>
  );
}

export default Login;
