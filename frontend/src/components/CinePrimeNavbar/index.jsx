import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "@src/hooks/useAuth";

export default function CinePrimeNavbar() {
  const { user, signOut } = useAuth()
  
  const isAdmin = user? user.isAdmin : false

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" style={{ width: "100%"}}>
        <Container>
          <Link className="navbar-brand" to="/">CinePrime</Link>
          <Container className="d-flex justify-content-end" >

          {user?
            <>
              <Link style={{marginRight: '20px'}}>{`Perfil (${user.nome})`}</Link>
              {isAdmin && 
                <Link style={{marginRight: '20px'}}
                  to='/funcionarios'
                >
                  Funcionários
                </Link>}
              <Link style={{marginRight: '20px'}} onClick={signOut}>Sair</Link>
            </>
            :
            <>
              <Link style={{marginRight: '20px'}} to="/login">Fazer Login</Link>
              <Link style={{marginRight: '20px'}} to="/cadastro">Cadastre-se</Link>
            </> 
          }
          </Container>
        </Container>
      </Navbar>
    </>
  );
}
