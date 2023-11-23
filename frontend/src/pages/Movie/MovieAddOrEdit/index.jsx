import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Spinner from 'react-bootstrap/Spinner';

import Api from "@services/Api";

import InputText from "@components/InputText";
import Button from "@components/Button";
import { useAuth } from "@src/hooks/useAuth";
import { FormLabel } from "react-bootstrap";

export default function MovieAddOrEdit() {
  const navigate = useNavigate();
  const location = useLocation()
  const { user } = useAuth()

  const editing = location.state?.id
  if (editing) {
    var loadedMovie = useRef(false);
    var id = location.state.id
  }

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [duration, setDuration] = useState("");
  const [classification, setClassification] = useState("");
  const [synopsis, setSynopsis] = useState("");


  const fetchMovie = async () => {
    try {
      setLoading(true)

      const { data } = await Api.get('/movie/' + id)
      setName(data.name)
      setGenre(data.genre)
      setDuration(data.duration)
      setClassification(data.classification)
      setSynopsis(data.synopsis)
    } catch (error) {
      console.log('ERROR ->', error.message)
      alert('Erro ao carregar filme. Tente novamente mais tarde')

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (editing && user && !loadedMovie.current) {
      fetchMovie()
      loadedMovie.current = true
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        const { data } = await Api.put(`/movie/${id}`, {
          name,
          genre,
          duration: Number(duration),
          classification,
          synopsis,
        });
        alert(`Filme ${data.name} atualizado com sucesso!`);
        navigate("/filme/list");

      } else {
        const { data } = await Api.post('/movie/', {
          name,
          genre,
          duration: Number(duration),
          classification,
          synopsis,
        });
        alert(`Filme ${data.name} cadastrado com sucesso!`);
        navigate("/filme/list");
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
    <Button text={"Voltar"} onClick={() => navigate('/filme/list')} style={{ width: 'fit-content', marginRight: 20, alignSelf: 'start' }}></Button>
      <Form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <InputText
          label="Nome:"
          placeholder="Digite aqui o nome do filme"
          value={name}
          onChange={(evt) => setName(evt.target.value)}
        />
        <label htmlFor='genre'>Escolha o gênero do filme:</label>
        <select name="genre" id="genre" value={genre} onChange={(evt) => { setGenre(evt.target.value) }}>
          <option value="" disabled hidden>Escolha uma opção</option>
          <option value="Drama">Drama</option>
          <option value="Comédia">Comédia</option>
          <option value="Ação">Ação</option>
          <option value="Aventura">Aventura</option>
          <option value="Terror">Terror</option>
          <option value="Suspense">Suspense</option>
          <option value="Romance">Romance</option>
          <option value="Ficção Científica">Ficção Científica</option>
          <option value="Fantasia">Fantasia</option>
          <option value="Documentário">Documentário</option>
          <option value="Animação">Animação</option>
        </select>
        <FormLabel>Duração do filme:</FormLabel>
        <input
          placeholder="Digite aqui a duração do filme"
          type="number"
          value={duration}
          onChange={(evt) => setDuration(evt.target.value)}
        />
        <InputText
          label="Classificação:"
          placeholder="Digite aqui a classificação do filme"
          value={classification}
          onChange={(evt) => setClassification(evt.target.value)}
        />
        <InputText
          label="Sinopse:"
          placeholder="Digite aqui a sinopse do filme"
          value={synopsis}
          onChange={(evt) => setSynopsis(evt.target.value)}
        />
        <Button variant="success" text="Salvar" type="submit" />
      </Form>
    </>
  );
}
