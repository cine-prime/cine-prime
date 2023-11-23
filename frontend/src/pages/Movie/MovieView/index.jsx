import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Spinner from 'react-bootstrap/Spinner';

import './style.css'

import Api from "@services/Api";

import InputText from "@components/InputText";
import Button from "@components/Button";
import { useAuth } from "@hooks/useAuth";
import { FormLabel } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function MovieView() {
  const navigate = useNavigate();
  const location = useLocation()
  const { user } = useAuth()

  const params = useParams();
  const { id } = params;

  const loadedMovie = useRef(false);

  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState(null);


  const fetchMovie = async () => {
    try {
      setLoading(true)

      const { data } = await Api.get('/movie/' + id)
      setMovie(data)
    } catch (error) {
      console.log('ERROR ->', error.message)
      alert('Erro ao carregar filme. Tente novamente mais tarde')

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user && !loadedMovie.current) {
      fetchMovie()
      loadedMovie.current = true
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
      {!movie && <h1>Filme não encontrado</h1>}
      {movie &&
        <div style={{display:'flex', flexDirection:'column', width:'100%' }}>
          {console.log(movie)}
          <div>
            <Button text={"Voltar"} onClick={() => navigate('/filme/list')} style={{ width: 'fit-content', marginBottom: 20 }}></Button>
            <h1>Dados de Filme</h1>

          </div>
          <ul>
            <p><span className='title'>Id: </span>{id}</p>
            <p><span className='title'>Nome do filme: </span>{movie.name}</p>
            <p><span className='title'>Gênero: </span>{movie.genre}</p>
            <p><span className='title'>Duração: </span>{movie.duration} minutos</p>
            <p><span className='title'>Classificação: </span>{movie.classification}</p>
            <p><span className='title'>Siponse: </span>{movie.synopsis}</p>

          </ul>
          <h2>Sessões Atuais do filme</h2>
          {
            movie.sessions && movie.sessions.map((session, index) => {
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
                      <span className='title'>Id da Sala: </span>
                      {
                        session.idRoom
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
          {movie.sessions.length === 0 && <p>Não há sessões cadastradas para este filme</p>}

        </div>
      }
    </>
  );
}
