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
import Select from "react-dropdown-select";

export default function SessionAddOrEdit() {
  const navigate = useNavigate();
  const location = useLocation()
  const { user } = useAuth()

  const editing = location.state?.id
  if (editing) {
    var loadedSession = useRef(false);
    var id = location.state.id
  }

  var firstRender = useRef(false)

  let atualTicketsQtd = 0;

  const [loading, setLoading] = useState(false);
  const [dateTime, setDateTime] = useState("");
  const [idRoom, setIdRoom] = useState("");
  const [idMovie, setIdMovie] = useState('');
  const [exibitionType, setExibitionType] = useState('');
  const [dublingType, setDublingType] = useState('');
  const [maxTicketsQtd, setMaxTicketsQtd] = useState('');
  const [rooms, setRooms] = useState([]);
  const [movies, setMovies] = useState([]);
  

  const fetchSession = async () => {
    try {
      setLoading(true)

      const { data } = await Api.get('/session/' + id)

      setDateTime(converterParaFormatoOriginal(data.dateTime))
      setIdRoom(data.room)
      setIdMovie(data.movie)
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

  const loadRoomsAndMovies = async () => {
    try {
      let rooms = await Api.get('/room')

      let movies = await Api.get('/movie')

      setRooms(rooms.data)

      setMovies(movies.data)

    } catch (error) {
      console.log('ERROR ->', error.message)

      alert('Erro ao corregar salas e filmes disponíveis. Tente novamente mais tarde.')
    }
  }

  useEffect(() => {
    if (editing && user && !loadedSession.current) {
      fetchSession()
      loadedSession.current = true
    }
    if (user && !firstRender.current) {
      loadRoomsAndMovies()
      firstRender.current = true
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        const { data } = await Api.put(`/session/${id}`, {
          dateTime: dateTime? new Date(dateTime).toISOString() : undefined,
          idRoom: idRoom.id !== undefined? Number(idRoom.id) : Number(idRoom),
          idMovie: idMovie.name? Number(idMovie.id) : Number(idMovie),
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

        <label htmlFor="start">Data da sessão:</label>
        <input 
          type="date" 
          id="start" 
          name="trip-start" 
          value={dateTime} 
          onChange={(evt) => setDateTime(evt.target.value)} 
        />

        <Select 
          options={rooms} 
          values={editing? [idRoom] : undefined}
          labelField="id" 
          valueField="id"
          onChange={value => setIdRoom(value[0].id)}
          placeholder="Selecione uma sala"
          style={{marginTop: 20}}
        />

        <Select 
          options={movies} 
          values={editing? [idMovie] : undefined}
          labelField="name" 
          valueField="id"
          onChange={value => setIdMovie(value[0].id)}
          placeholder="Selecione um filme"
          style={{marginTop: 20}}
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

        {editing && 
        <>
        <label htmlFor="start">Ingressos vendidos:</label>
        <input
          disabled
          placeholder="Ingressos vendidos"
          type="number"
          value={atualTicketsQtd}
        />
        </>}

        <Button variant="success" text="Salvar" type="submit" style={{marginTop: 20}} />
      </Form>
    </>
  );
}
