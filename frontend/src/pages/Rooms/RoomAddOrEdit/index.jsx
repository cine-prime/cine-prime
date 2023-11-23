import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Spinner from 'react-bootstrap/Spinner';

import Api from "@services/Api";

import InputText from "@components/InputText";
import Button from "@components/Button";
import { useAuth } from "@src/hooks/useAuth";

export default function RoomAddOrEdit() {
  const navigate = useNavigate();
  const location = useLocation()
  const { user } = useAuth()

  const editing = location.state?.id
  if (editing) {
    var loadedRoom = useRef(false);
    var id = location.state.id
  }

  const [loading, setLoading] = useState(false);
  const [qtd_max, setQtdMax] = useState("");
  const [typeExhibitionAccepted, setTypeExhibitionAccepted] = useState("");


  const fetchRoom = async () => {
    try {
      setLoading(true)

      const { data } = await Api.get('/room/' + id)
      setQtdMax(data.qtd_max)
      setTypeExhibitionAccepted(data.typeExhibitionAccepted)
    } catch (error) {
      console.log('ERROR ->', error.message)
      alert('Erro ao carregar a sala. Tente novamente mais tarde')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (editing && user && !loadedRoom.current) {
      fetchRoom()
      loadedRoom.current = true
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        const { data } = await Api.put(`/room/${id}`, {
          qtd_max: Number(qtd_max),
          typeExhibitionAccepted,
        });
        alert(`Sala atualizada com sucesso!`);
        navigate("/sala/list");

      } else {
        const { data } = await Api.post('/room/', {
          qtd_max: Number(qtd_max),
          typeExhibitionAccepted,
        });
        alert(`Sala cadastrada com sucesso!`);
        navigate("/sala/list");
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
      <Button text={"Voltar"} onClick={() => navigate('/sala/list')} style={{ width: 'fit-content', marginRight: 20, alignSelf: 'start' }}></Button>
      <Form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="qtd_max" >Quantidade máxima da Sala:</label>
        <input
          placeholder="Digite aqui a quantidade máxima da sala"
          type="number"
          value={qtd_max}
          name="qtd_max"
          id="qtd_max"
          onChange={(evt) => setQtdMax(evt.target.value)}
        />
        <InputText
          label="Tipo de exibição da Sala:"
          placeholder="Digite aqui o tipo de exibição da sala"
          value={typeExhibitionAccepted}
          onChange={(evt) => setTypeExhibitionAccepted(evt.target.value)}
        />
        <Button variant="success" text="Salvar" type="submit" />
      </Form>
    </>
  );
}
