import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

import Api from "@services/Api";

import InputText from "@components/InputText";
import MainContainer from "@src/components/ContentContainer";
import Button from "@components/Button";

export default function Singup(props) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Api.post("/user", {
        nome: name,
        cpf: cpf,
        email: email,
        telefone: phone,
        password: password,
      });
      alert(`Usuário ${data.nome} cadastrado com sucesso!`);
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
          label="Nome:"
          placeholder="Ex: Ana Maria"
          value={name}
          onChange={(obj) => setName(obj.target.value)}
        />
        <InputText
          label="CPF:"
          placeholder="Ex: 02738499302"
          value={cpf}
          onChange={(obj) => setCpf(obj.target.value)}
        />
        <InputText
          label="Email:"
          placeholder="Ex: anamaria@gmail.com"
          value={email}
          onChange={(obj) => setEmail(obj.target.value)}
        />
        <InputText
          label="Telefone:"
          placeholder="Ex: (85) 94344-4385"
          value={phone}
          onChange={(obj) => setPhone(obj.target.value)}
        />
        <InputText
          label="Senha:"
          type="password"
          value={password}
          onChange={(obj) => setPassword(obj.target.value)}
        />
        <Button variant="success" text="Cadastrar" type="submit" />
      </Form>
    </>
  );
}
