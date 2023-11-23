import { useEffect, useState, useRef } from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Api from '@src/services/Api';
import { useAuth } from '@src/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Button from '@src/components/Button';

export default function MovieList(props) {
  const { user } = useAuth()
  const loadedUser = useRef(false)

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [movies, setMovies] = useState([])

  useEffect(() => {
    if (user && !loadedUser.current) {
      loadedUser.current = true
      loadMovies()

    }
  }, [user])

  const excludeMovie = async (id) => {
    try {
      setLoading(true)


      await Api.delete('/movie/' + id)

      alert(`Filme excluído com sucesso!`);
      let auxMovie = movies.filter(movie => movie.id !== id)
      setMovies(auxMovie)
    } catch (error) {
      console.log('ERROR ->', error.message)
      alert(`Erro: ${error.response.data.message}`);

    } finally {
      setLoading(false)
    }
  }

  const loadMovies = async () => {
    try {
      setLoading(true)

      const { data } = await Api.get('/movie')
      console.log(data)
      if (data.length > 0) {
        setMovies(data)
      } else {
        setMovies(false)
      }

    } catch (error) {
      console.log('ERROR ->', error.message)
      alert('Erro ao carregar filmes. Tente novamente mais tarde.')

    } finally {
      setLoading(false)

    }
  }

  function converteMinutosEmHoras(minutos) {
    let horas = Math.floor(minutos / 60);
    let minutosRestantes = minutos % 60;
    return (minutosRestantes > 0) ? `${horas}h${minutosRestantes}m` : `${horas}h`;
  }

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Carregando...</span>
      </Spinner>
    )
  }

  if (!movies) {
    return (
      <div style={{ width: '100%', display:'flex',flexDirection:'column' }}>
          <Button text={"Voltar"} onClick={() => navigate('/')} style={{ width: 'fit-content', marginRight: 20 }}></Button>
          <button className='mb-3' onClick={() => navigate('/filme/cadastrar')} style={{ alignSelf: 'end', borderColor: 'green', color: 'green' }}>Cadastrar novo filme</button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Ainda sem filmes</th>
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
      <button className='btn mb-3' onClick={() => navigate('/filme/cadastrar')} style={{ alignSelf: 'flex-end', borderColor: 'green', fontWeight: '500', color: 'white', backgroundColor: 'green' }}>Cadastrar novo filme</button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Nome</th>
            <th>Gênero</th>
            <th>Duração</th>
            <th>Classificação</th>
            <th>Sinopse</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie, index) => (
            <tr key={index}>
              <td>{movie.id}</td>
              <td>{movie.name}</td>
              <td>{movie.genre}</td>
              <td>{`${converteMinutosEmHoras(movie.duration)}`}</td>
              <td>{movie.classification}</td>
              <td>{movie.synopsis}</td>
              <td style={{ height: '200px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', height: '100%', alignItems: 'center' }}>
                  <button onClick={() => navigate('/filme/editar', { state: { id: movie.id } })} style={{ borderColor: 'green', fontWeight: '500', color: 'white', backgroundColor: '#2323b6' }}>Editar</button>
                  <button onClick={() => {
                    if (confirm('Tem certeza que deseja excluir esse filme?')) {
                      excludeMovie(movie.id);
                    } else {
                      return false;
                    }
                  }}
                    style={{ borderColor: 'red', fontWeight: '500', color: 'black', backgroundColor: 'red' }}
                  >
                    Excluir
                  </button>
                  <button onClick={() => navigate(`/filme/${movie.id}`)}
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