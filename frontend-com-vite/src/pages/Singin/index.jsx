import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

import Api from "@services/Api";

import InputText from "@components/InputText";
import MainContainer from "@src/components/ContentContainer";
import Button from "@components/Button";

export default function Singin(props) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Api.post("/auth", {
        email: email,
        password: password,
      });
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("user_email", data.userEmail);
      navigate("/");
    } catch (error) {
      console.log("ERROR ->", error.response.data.message);
      alert(`Erro: ${error.response.data.message}`);
    }
  };

  return (
    <MainContainer>
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
    </MainContainer>
  );
}
