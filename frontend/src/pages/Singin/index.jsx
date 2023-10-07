import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

import InputText from "@components/InputText";
import Button from "@components/Button";
import { useAuth } from "@src/hooks/useAuth";

export default function Singin(props) {
  const { signIn } = useAuth()

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password)
      navigate("/");
    } catch (error) {
      console.log("ERROR ->", error);
      alert(`Erro: ${error.response.data.message}`);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <InputText
          label="Email:"
          value={email}
          onChange={(obj) => setEmail(obj.target.value)}
        />
        <InputText
          label="Senha:"
          type="password"
          value={password}
          onChange={(obj) => setPassword(obj.target.value)}
        />
        <Button variant="success" text="Entrar" type="submit" />
      </Form>
    </>
  );
}
