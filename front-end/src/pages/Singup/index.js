import React, {useState} from 'react'
import Api from '../../services/Api'

import InputText from '../../components/InputText'
import MainContainer from '../../components/MainContainer'
import Button from '../../components/Button'

export default function Singup(props) {
  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async () => {
    try {

      const { data } = await Api.post('/user', {
        nome: name,
        cpf: cpf,
        email: email,
        telefone: phone,
        password: password,
      })
      alert(`Usuário ${data.nome} cadastrado com sucesso!`)

    } catch (error) {
      console.log('ERROR ->', error.response.data.message)
      alert(`Erro: ${error.response.data.message}`)

    }
  }

  return (
    <MainContainer>
      <InputText 
        label='Nome:'
        placeholder='Ex: Ana Maria'
        value={name}
        onChange={(obj) => setName(obj.target.value)}
      />
      <InputText 
        label='CPF:'
        placeholder='Ex: 02738499302'
        value={cpf}
        onChange={(obj) => setCpf(obj.target.value)}
      />
      <InputText 
        label='Email:'
        placeholder='Ex: anamaria@gmail.com'
        value={email}
        onChange={(obj) => setEmail(obj.target.value)}
      />
      <InputText 
        label='Telefone:'
        placeholder='Ex: (85) 94344-4385'
        value={phone}
        onChange={(obj) => setPhone(obj.target.value)}
      />
      <InputText 
        label='Senha:'
        type='password'
        value={password}
        onChange={(obj) => setPassword(obj.target.value)}
      />
      <Button variant='success' text='Cadastrar' onClick={() => handleSubmit()} />
    </MainContainer>
  )
}