import { Navbar, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@src/hooks/useAuth";
import Button from "../Button";



export default function CinePrimeNavbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const isAdmin = user ? user.isAdmin : false

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" style={{ width: "100%" }}>
        <Container>
          <Link className="navbar-brand" to="/">CinePrime</Link>
          <Container className="d-flex justify-content-end" >

            {user ?
              <>
                <Link style={{ marginRight: '20px' }}>{`Perfil (${user.nome})`}</Link>
                {isAdmin &&
                  <Link style={{ marginRight: '20px' }}
                    to='/funcionario/list'
                  >
                    Funcionários
                  </Link>}
                <Button style={{ marginRight: '20px' }} onClick={() => { signOut(); navigate('/') }} text="Sair"></Button>
              </>
              :
              <>
                <Link style={{ marginRight: '20px' }} to="/login">Fazer Login</Link>
                <Link style={{ marginRight: '20px' }} to="/cadastro">Cadastre-se</Link>
              </>
            }
          </Container>
        </Container>
      </Navbar>
    </>
  );
}
