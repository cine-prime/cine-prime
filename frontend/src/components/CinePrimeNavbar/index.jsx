import React, { useState } from "react";
import { Navbar, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@src/hooks/useAuth";
import Button from "../Button";
import "./styles.css";

export default function CinePrimeNavbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user ? user.isAdmin : false;

  // Estado para controlar a aba ativa
  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const handleLogoClick = () => {
    setActiveLink(null);
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark" style={{ width: "100%" }}>
      <Container>
        <div className="align-items-center">
          <Link className="navbar-brand mb-3" to="/" onClick={handleLogoClick}>
            <img
              src="/assets/images/logo2.png"
              alt="CinePrime Logo"
              style={{ maxWidth: '100%', maxHeight: '80px' }}
            />
          </Link>
        </div>

        <div className="d-flex justify-content-center align-items-center w-100">
          <div className="d-flex align-items-center">
            {user && (
              <>
                {isAdmin && (
                  <Link
                    className={`nav-link mx-2 ${activeLink === 'funcionarios' ? 'active' : ''}`}
                    to='/funcionario/list'
                    onClick={() => handleLinkClick('funcionarios')}
                  >
                    Funcionários
                  </Link>
                )}

                {user.profile === 'employee' && (
                  <>
                    <Link
                      className={`nav-link mx-2 ${activeLink === 'filmes' ? 'active' : ''}`}
                      to='/filme/list'
                      onClick={() => handleLinkClick('filmes')}
                    >
                      Filmes
                    </Link>

                    <Link
                      className={`nav-link mx-2 ${activeLink === 'salas' ? 'active' : ''}`}
                      to='/sala/list'
                      onClick={() => handleLinkClick('salas')}
                    >
                      Salas
                    </Link>
                    <Link 
                      className={`nav-link mx-2 ${activeLink === 'sessoes' ? 'active' : ''}`}
                      style={{ marginRight: '20px' }}
                      to='/sessoes/list'
                      onClick={() => handleLinkClick('sessoes')}
                    >
                      Sessões
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        <div className="d-flex align-items-center">
          {user ? (
            <>
              <div className="user-info">
                <span
                  className={`mx-2 font-weight-bold text-white ${activeLink === 'profile' ? 'active' : ''}`}
                  onClick={() => handleLinkClick('profile')}
                >
                  <span className="user-label">Usuário</span>
                  <span className="user-name">{user.nome}</span>
                </span>
              </div>

              <Button
                className="nav-link circle-button my-2"
                style={{
                  backgroundColor: '#2c2c46',
                  fontSize: '14px',
                }}
                onClick={() => { signOut(); navigate('/') }}
                text="Sair"
              ></Button>
            </>
          ) : (
            <div className="d-flex">
              <Link
                className={`nav-link mx-2 ${activeLink === 'login' ? 'active' : ''}`}
                to="/login"
                onClick={() => handleLinkClick('login')}
              >
                Fazer Login
              </Link>

              <Link
                className={`nav-link mx-2 ${activeLink === 'cadastro' ? 'active' : ''}`}
                to="/cadastro"
                onClick={() => handleLinkClick('cadastro')}
              >
                Cadastre-se
              </Link>
            </div>
          )}
        </div>
      </Container>
    </Navbar>
  );
}