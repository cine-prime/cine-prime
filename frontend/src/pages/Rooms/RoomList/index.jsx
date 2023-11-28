import { useEffect, useState, useRef } from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Api from '@src/services/Api';
import { useAuth } from '@src/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Button from '@src/components/Button';

export default function RoomList() {
  const { user } = useAuth()
  const loadedRoom = useRef(false)

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    if (user && !loadedRoom.current) {
      loadedRoom.current = true
      loadRooms()

    }
  }, [user])

  const excludeRoom = async (id) => {
    try {
      setLoading(true)


      await Api.delete('/room/' + id)

      alert(`Sala excluído com sucesso!`);
      let auxRoom = rooms.filter(room => room.id !== id)
      setRooms(auxRoom)
    } catch (error) {
      console.log('ERROR ->', error.message)
      alert(`Erro: ${error.response.data.message}`);

    } finally {
      setLoading(false)
    }
  }

  const loadRooms = async () => {
    try {
      setLoading(true)

      const { data } = await Api.get('/room')
      console.log(data)
      if (data.length > 0) {
        setRooms(data)
      } else {
        setRooms(false)
      }

    } catch (error) {
      console.log('ERROR ->', error.message)
      alert('Erro ao carregar as salas. Tente novamente mais tarde.')

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

  if (!rooms) {
    return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <Button text={"Voltar"} onClick={() => navigate('/')} style={{ width: 'fit-content', marginRight: 20 }}></Button>
        <button className='mb-3' onClick={() => navigate('/sala/cadastrar')} style={{ alignSelf: 'flex-end', borderColor: 'green', color: 'green' }}>Cadastrar nova sala</button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Ainda sem salas</th>
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
      <button className='btn mb-3' onClick={() => navigate('/sala/cadastrar')} style={{ alignSelf: 'flex-end', borderColor: 'green', fontWeight: '500', color: 'white', backgroundColor: 'green' }}>Cadastrar novo sala</button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sala</th>
            <th>Quantidade máxima de pessoas</th>
            <th>Tipo de exibição suportada</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => (
            <tr key={index}>
              <td>{room.id}</td>
              <td>{room.qtd_max}</td>
              <td>{room.typeExhibitionAccepted}</td>
              <td style={{ height: '120px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', height: '100%', alignItems: 'center' }}>
                  <button onClick={() => navigate('/sala/editar', { state: { id: room.id } })} style={{ borderColor: 'green', fontWeight: '500', color: 'white', backgroundColor: '#2323b6' }}>Editar</button>
                  <button onClick={() => {
                    if (confirm('Tem certeza que deseja excluir essa sala?')) {
                      excludeRoom(room.id);
                    } else {
                      return false;
                    }
                  }}
                    style={{ borderColor: 'red', fontWeight: '500', color: 'black', backgroundColor: 'red' }}
                  >
                    Excluir
                  </button>
                  <button onClick={() => navigate(`/sala/${room.id}`)}
                    style={{}}
                    className='btn btn-secondary'
                  >
                    Vizualizar
                  </button>

                </div>

              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}