import { useEffect, useState, useRef } from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Api from '@src/services/Api';
import { useAuth } from '@src/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Button from '@src/components/Button';
import { converterParaFormatoDdMmYyyy } from '@src/services/Convertions';

export default function SessionsList(props) {
  const { user } = useAuth()
  const loadedUser = useRef(false)

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [sessions, setSessions] = useState([])

  useEffect(() => {
    if (user && !loadedUser.current) {
      loadedUser.current = true
      loadSessions()

    }
  }, [user])

  const excludeSession = async (id) => {
    try {
      setLoading(true)


      await Api.delete('/session/' + id)

      alert(`Sessão excluída com sucesso!`);
      let auxSessions = sessions.filter(session => session.id !== id)
      setSessions(auxSessions)
    } catch (error) {
      console.log('ERROR ->', error.message)
      alert(`Erro: ${error.response.data.message}`);

    } finally {
      setLoading(false)
    }
  }

  const loadSessions = async () => {
    try {
      setLoading(true)

      const { data } = await Api.get('/session')
      console.log(data)
      if (data.length > 0) {
        setSessions(data)
      } else {
        setSessions(false)
      }

    } catch (error) {
      console.log('ERROR ->', error.message)
      alert('Erro ao carregar filmes. Tente novamente mais tarde.')

    } finally {
      setLoading(false)

    }
  }

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Carregando...</span>
      </Spinner>
    )
  }

  if (!sessions) {
    return (
      <div style={{ width: '100%', display:'flex',flexDirection:'column' }}>
          <Button text={"Voltar"} onClick={() => navigate('/')} style={{ width: 'fit-content', marginRight: 20 }}></Button>
          <button className='mb-3' onClick={() => navigate('/sessoes/cadastrar')} style={{ alignSelf: 'end', borderColor: 'green', color: 'green' }}>Cadastrar nova sessão</button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Ainda sem sessões</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </Table>
      </div>
    )
  }

  return (
    <>
      <Button text={"Voltar"} onClick={() => navigate('/')} style={{ width: 'fit-content', marginRight: 20, alignSelf: 'start' }}></Button>
      <button className='btn mb-3' onClick={() => navigate('/sessoes/cadastrar')} style={{ alignSelf: 'flex-end', borderColor: 'green', fontWeight: '500', color: 'white', backgroundColor: 'green' }}>Cadastrar nova sessão</button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Data</th>
            <th>Sala</th>
            <th>Filme</th>
            <th>Tipo de exibição</th>
            <th>Tipo de dublagem</th>
            <th>Quantidade de ingressos vendidos</th>
            <th>Capacidade</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session, index) => (
            <tr key={index}>
              <td>{session.id}</td>
              <td>{converterParaFormatoDdMmYyyy(session.dateTime)}</td>
              <td>{session.idRoom}</td>
              <td>{session.movie.name}</td>
              <td>{session.exibitionType}</td>
              <td>{session.dublingType}</td>
              <td>{session.atualTicketsQtd}</td>
              <td>{session.maxTicketsQtd}</td>
              <td>
                <button onClick={() => navigate('/sessoes/editar', { state: { id: session.id } })} style={{ marginRight: '20px', borderColor: 'blue', color: 'blue' }}>Editar</button>
                <button onClick={() => {
                  if (confirm('Tem certeza que deseja excluir essa sessão?')) {
                    excludeSession(session.id)
                  } else {
                    return false;
                  }
                }}
                  style={{ borderColor: 'red', color: 'red' }}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}