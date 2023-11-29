import React, { useEffect, useState, useRef } from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Api from '@src/services/Api';
import { useAuth } from '@src/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Button from '@src/components/Button';
import './style.css';  // Certifique-se de importar o arquivo CSS que contém os estilos

const RoomList = () => {
  const { user } = useAuth();
  const loadedRoom = useRef(false);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (user && !loadedRoom.current) {
      loadedRoom.current = true;
      loadRooms();
    }
  }, [user]);

  const excludeRoom = async (id) => {
    try {
      setLoading(true);

      await Api.delete('/room/' + id);

      alert('Sala excluída com sucesso!');
      let auxRoom = rooms.filter((room) => room.id !== id);
      setRooms(auxRoom);
    } catch (error) {
      console.log('ERROR ->', error.message);
      alert(`Erro: ${error.response.data.message}`);
    } finally {
      setLoading(false);
    }
  };

  const loadRooms = async () => {
    try {
      setLoading(true);

      const { data } = await Api.get('/room');
      console.log(data);
      if (data.length > 0) {
        setRooms(data);
      } else {
        setRooms(false);
      }
    } catch (error) {
      console.log('ERROR ->', error.message);
      alert('Erro ao carregar as salas. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Carregando...</span>
      </Spinner>
    );
  }

  if (!rooms) {
    return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <Button text={'Voltar'} onClick={() => navigate('/')} style={{ width: 'fit-content', marginRight: 20 }} />
        <Button style={{ alignSelf: 'flex-end', borderColor: 'green', backgroundColor: 'green' ,fontWeight: 'bold'}} onClick={() => navigate('/sala/cadastrar')} text='Cadastrar nova sala' />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Ainda sem salas</th>
            </tr>
          </thead>
          <tbody></tbody>
        </Table>
      </div>
    );
  }

  return (
    <>
      <Button text={'Voltar'} onClick={() => navigate('/')} style={{ width: 'fit-content', marginRight: 20, alignSelf: 'start' }} />
      <Button style={{ marginBottom: '20px',alignSelf: 'flex-end', borderColor: 'green', backgroundColor: 'green' ,fontWeight: 'bold'}} onClick={() => navigate('/sala/cadastrar')} text='Cadastrar nova sala' />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sala</th>
            <th>Quantidade máxima de pessoas</th>
            <th>Tipo de exibição suportada</th>
            <th style={{maxWidth: '120px'}}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => (
            <tr key={index}>
              <td>{room.id}</td>
              <td>{room.qtd_max}</td>
              <td style={{maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{room.typeExhibitionAccepted}</td>
              <td style={{height: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                {/* <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', height: '100%', alignItems: 'center' }}> */}
                  <Button 
                    style={{backgroundColor: '#4682B4', color:' #f0f0f0',fontWeight: 'bold'}}
                    onClick={() => navigate('/sala/editar', { state: { id: room.id } })}
                    text =' Editar'
                  />
                   
                  
                  <Button
                  style= {{backgroundColor: '#FF433F', color:'#f0f0f0',fontWeight: 'bold'}}
                    onClick={() => {
                      if (window.confirm('Tem certeza que deseja excluir essa sala?')) {
                        excludeRoom(room.id);
                      }
                    }}
                    text=' Excluir'
                  />

                  <Button
                    style ={{backgroundColor: '#2E8B57',color:'#0f0f0' ,fontWeight: 'bold'}}
                    onClick={() => navigate(`/sala/${room.id}`)}
                    text='Vizualizar'
                  />
                {/* </div> */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default RoomList;
