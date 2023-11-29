import { useEffect, useState, useRef } from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Api from '@services/Api';
import { useAuth } from '@hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Button from '@components/Button';

export default function EmployeeList(props) {
  const { user } = useAuth()
  const loadedUser = useRef(false)

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    if (user && !loadedUser.current) {
      loadedUser.current = true
      loadEmployees()

    }
  }, [user])

  const excludeEmployee = async (id) => {
    try {
      setLoading(true)

      await Api.delete('/employee/' + id)

      alert(`Funcionário excluído com sucesso!`);
      let auxEmp = employees.filter(employee => employee.id !== id)
      setEmployees(auxEmp)

    } catch (error) {
      console.log('ERROR ->', error.message)
      alert(`Erro: ${error.response.data.message}`);

    } finally {
      setLoading(false)
    }
  }

  const loadEmployees = async () => {
    try {
      setLoading(true)

      const { data } = await Api.get('/employee')
      if (data.length > 0) {
        setEmployees(data)

      } else {
        setEmployees(false)

      }

    } catch (error) {
      console.log('ERROR ->', error.message)
      alert('Erro ao carregar funcionários. Tente novamente mais tarde.')

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

  if (!employees) {
    return (
      <>
        <Button text={"Voltar"} onClick={() => navigate('/')} style={{ width: 'fit-content', marginRight: 20, alignSelf: 'start' }}></Button>
        <Button style={{ marginBottom: '20px', alignSelf: 'flex-end', borderColor: 'green', backgroundColor: 'green' ,fontWeight: 'bold'}} onClick={() => navigate('/funcionario/cadastrar')}  text = 'Cadastrar novo funcionario'/>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Ainda sem funcionarios</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </Table>
      </>
    )
  }

  return (
    <>
      <Button text={"Voltar"} onClick={() => navigate('/')} style={{ width: 'fit-content', marginRight: 20, alignSelf: 'start' }}></Button>
      <Button style={{  marginBottom: '20px',alignSelf: 'flex-end', borderColor: 'green', backgroundColor: 'green' ,fontWeight: 'bold'}} onClick={() => navigate('/funcionario/cadastrar')}  text = 'Cadastrar novo funcionario'/>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{employee.nome}</td>
              <td>{employee.cpf}</td>
              <td>{employee.telefone}</td>
              <td>{employee.email}</td>
              <td>
                <Button style={{ backgroundColor: '#4682B4', color:' #f0f0f0',fontWeight: 'bold',marginRight: '10px'}} onClick={() => navigate('/funcionario/editar', { state: { id: employee.id } })} text='Editar'/>
                <Button style={{backgroundColor: '#F0373E',color:'#0f0f0' ,fontWeight: 'bold'}} onClick={() => {
                  if (confirm('Tem certeza que deseja excluir esse funcionário?')) {
                    excludeEmployee(employee.id);
                  } else {
                    return false;
                  }
                }}
                text='Excluir'
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}