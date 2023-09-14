import InputText from '../../components/InputText'
import MainContainer from '../../components/MainContainer'

export default function Singup(props) {
  return (
    <MainContainer>
      <InputText 
        label='Nome:'
        placeholder='Ex: Ana Maria'
      />
      <InputText 
        label='CPF:'
        placeholder='Ex: 02738499302'
      />
      <InputText 
        label='Email:'
        placeholder='Ex: anamaria@gmail.com'
      />
      <InputText 
        label='Telefone:'
        placeholder='Ex: (85) 94344-4385'
      />
      <InputText 
        label='Senha:'
      />
    </MainContainer>
  )
}