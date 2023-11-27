import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Spinner from 'react-bootstrap/Spinner';

import Api from "@services/Api";

import InputText from "@components/InputText";
import Button from "@components/Button";
import { useAuth } from "@src/hooks/useAuth";
import { converterParaFormatoOriginal } from "@src/services/Convertions";
import { converterParaFormatoDdMmYyyy } from '@src/services/Convertions';

export default function SessionAddOrEdit() {
  const navigate = useNavigate();
  const location = useLocation()
  const { user } = useAuth()

  const editing = location.state?.id
  if (editing) {
    var loadedSession = useRef(false);
    var id = location.state.id
  }

  let atualTicketsQtd = 0;

  const [loading, setLoading] = useState(false);
  const [dateTime, setDateTime] = useState("");
  const [idRoom, setIdRoom] = useState("");
  const [idMovie, setIdMovie] = useState('');
  const [exibitionType, setExibitionType] = useState('');
  const [dublingType, setDublingType] = useState('');
  const [maxTicketsQtd, setMaxTicketsQtd] = useState('');

  const fetchSession = async () => {
    try {
      setLoading(true)

      const { data } = await Api.get('/session/' + id)
      setDateTime(converterParaFormatoOriginal(data.dateTime))
      setIdRoom(data.idRoom)
      setIdMovie(data.idMovie)
      setExibitionType(data.exibitionType)
      setDublingType(data.dublingType)
      setMaxTicketsQtd(data.maxTicketsQtd)

    } catch (error) {
      console.log('ERROR ->', error.message)
      alert('Erro ao carregar filme. Tente novamente mais tarde')

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (editing && user && !loadedSession.current) {
      fetchSession()
      loadedSession.current = true
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        const { data } = await Api.put(`/session/${id}`, {
          dateTime: dateTime? new Date(dateTime).toISOString() : undefined,
          idRoom: Number(idRoom),
          idMovie: Number(idMovie),
          exibitionType,
          dublingType,
          maxTicketsQtd: Number(maxTicketsQtd),
          atualTicketsQtd: Number(atualTicketsQtd),
        });
        alert(`Sessão ${converterParaFormatoDdMmYyyy(data.dateTime)} atualizada com sucesso!`);
        navigate("/sessoes/list");

      } else {
        const { data } = await Api.post('/session/', {
          dateTime: dateTime? new Date(dateTime).toISOString() : undefined,
          idRoom: Number(idRoom),
          idMovie: Number(idMovie),
          exibitionType,
          dublingType,
          maxTicketsQtd: Number(maxTicketsQtd),
          atualTicketsQtd: Number(atualTicketsQtd),
        });
        alert(`Sessão ${converterParaFormatoDdMmYyyy(data.dateTime)} cadastrada com sucesso!`);
        navigate("/sessoes/list");
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
    <Button text={"Voltar"} onClick={() => navigate('/sessoes/list')} style={{ width: 'fit-content', marginRight: 20, alignSelf: 'start' }}></Button>
      <Form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>

        <input 
          type="date" 
          id="start" 
          name="trip-start" 
          value={dateTime} 
          onChange={(evt) => setDateTime(evt.target.value)} 
        />

        <input
          style={{marginTop: 20}}
          placeholder="Id da sala"
          type="number"
          value={idRoom}
          onChange={(evt) => setIdRoom(evt.target.value)}
        />

        <input
          style={{marginTop: 20}}
          placeholder="Id do filme"
          type="number"
          value={idMovie}
          onChange={(evt) => setIdMovie(evt.target.value)}
        />

        <InputText
          placeholder="Tipo de exibição"
          value={exibitionType}
          onChange={(obj) => setExibitionType(obj.target.value)}
        />

        <input
          style={{marginTop: 10}}
          placeholder="Capacidade da sessão"
          type="number"
          value={maxTicketsQtd}
          onChange={(evt) => setMaxTicketsQtd(evt.target.value)}
        />

        <InputText
          placeholder="Tipo de dublagem"
          value={dublingType}
          onChange={(obj) => setDublingType(obj.target.value)}
        />

        {editing && <input
          disabled
          style={{marginTop: 20}}
          placeholder="Ingressos vendidos"
          type="number"
          value={atualTicketsQtd}
        />}

        <Button variant="success" text="Salvar" type="submit" style={{marginTop: 20}} />
      </Form>
    </>
  );
}
