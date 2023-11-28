import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Spinner from 'react-bootstrap/Spinner';

import Api from "@services/Api";

import InputText from "@components/InputText";
import Button from "@components/Button";
import { useAuth } from "@src/hooks/useAuth";

export default function EmployeeAddOrEdit(props) {
  const navigate = useNavigate();
  const location = useLocation()
  const { user } = useAuth()

  const editing = location.state?.id
  if (editing) {
    var loadedEmployee = useRef(false);
    var id = location.state.id
  }

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");


  const fetchEmployee = async () => {
    try {
      setLoading(true)

      const { data } = await Api.get('/employee/' + id)
      setName(data.nome)
      setCpf(data.cpf)
      setEmail(data.email)
      setPhone(data.telefone)

    } catch (error) {
      console.log('ERROR ->', error.message)
      alert('Erro ao carregar funcionário. Tente novamente mais tarde')

    } finally {
      setLoading(false)

    }
  }

  useEffect(() => {
    if (editing && user && !loadedEmployee.current) {
      fetchEmployee()
      loadedEmployee.current = true
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        const { data } = await Api.put('/employee/' + id, {
          nome: name,
          cpf: cpf,
          email: email,
          telefone: phone,
          password: password,
        });
        alert(`Funcionário ${data.nome} atualizado com sucesso!`);
        navigate("/funcionario/list");

      } else {
        const { data } = await Api.post('/employee/', {
          nome: name,
          cpf: cpf,
          email: email,
          telefone: phone,
          password: password,
        });
        alert(`Funcionário ${data.nome} cadastrado com sucesso!`);
        navigate("/funcionario/list");
      }

    } catch (error) {
      console.log("ERROR ->", error.message);
      alert(`Erro: ${error.response.data.message}`);
    }
  };

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Carregando...</span>
      </Spinner>
    )
  }

  return (
    <>
      <Button text={"Voltar"} onClick={() => navigate('/funcionario/list')} style={{ width: 'fit-content', marginRight: 20, alignSelf: 'start' }}></Button>
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
        {!editing &&
          <InputText
            label="Senha:"
            type="password"
            value={password}
            onChange={(obj) => setPassword(obj.target.value)}
          />}
        <Button variant="success" text="Salvar" type="submit" />
      </Form>
    </>
  );
}
