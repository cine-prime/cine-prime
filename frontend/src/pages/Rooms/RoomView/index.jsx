import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Spinner from 'react-bootstrap/Spinner';

import './style.css'

import Api from "@services/Api";

import Button from "@components/Button";
import { useAuth } from "@hooks/useAuth";
import { useParams } from "react-router-dom";

export default function MovieView() {
  const navigate = useNavigate();
  const { user } = useAuth()

  const params = useParams();
  const { id } = params;

  const loadedRoom = useRef(false);

  const [loading, setLoading] = useState(false);
  const [room, setRoom] = useState(null);


  const fetchMovie = async () => {
    try {
      setLoading(true)

      const { data } = await Api.get('/room/' + id)
      setRoom(data)
    } catch (error) {
      console.log('ERROR ->', error.message)
      alert('Erro ao carregar a sala. Tente novamente mais tarde')

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user && !loadedRoom.current) {
      fetchMovie()
      loadedRoom.current = true
    }
  }, [user])

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Carregando...</span>
      </Spinner>
    )
  }

  return (
    <>
      {!room && <h1>Sala não encontrada</h1>}
      {room &&
        <div style={{ flex: 1, width:'100%' }}>
          {console.log(room)}
            <Button text={"Voltar"} onClick={() => navigate('/sala/list')} style={{ width: 'fit-content', marginBottom: '20px', alignSelf:'start' }}></Button>
          <div>
            <h1>Dados da Sala</h1>

          </div>
          <ul>
            <p><span className='title'>Id: </span>{id}</p>
            <p><span className='title'>Quantidade máxima de pessoas: </span>{room.qtd_max}</p>
            <p><span className='title'>Tipo de exibição suportada: </span>{room.typeExhibitionAccepted}</p>

          </ul>
          <h2>Sessões Atuais da sala</h2>
          {
            room.sessions && room.sessions.map((session, index) => {
              let data = new Date(session.dateTime);
              let dataFormatada = ((data.getDate())) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear() + " - " + data.getHours() + ":" + (data.getMinutes() > 9 ? data.getMinutes() : '0' + data.getMinutes());
              return (
                <div key={index}>
                  <p><span className='title'>Sessão {index + 1}: </span></p>
                  <ul>
                    <p>
                      <span className='title'>Data: </span>
                      {
                        dataFormatada
                      }
                    </p>
                    <p>
                      <span className='title'>Id do Filme: </span>
                      {
                        session.idMovie
                      }
                    </p>
                    <p>
                      <span className='title'>Tipo de exibição: </span>
                      {
                        session.exibitionType
                      }
                    </p>
                    <p>
                      <span className='title'>Tipo de dublagem: </span>
                      {
                        session.dublingType
                      }
                    </p>
                    <p>
                      <span className='title'>Quantidade atual de ingressos vendidos: </span>
                      {

                        session.atualTicketsQtd
                      }
                    </p>
                    <p>
                      <span className='title'>Quantidade máxima de ingressos: </span>
                      {
                        session.maxTicketsQtd
                      }
                    </p>
                  </ul>
                </div>
              )
            })
          }
          {room.sessions.length === 0 && <p>Não há sessões cadastradas para esta sala</p>}

        </div>
      }
    </>
  );
}
