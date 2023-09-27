import { useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";



export default function CinePrimeNavbar(props) {
  const [autenticacao, setAutentitacao] = useState(undefined);
  useEffect(() => {
    setAutentitacao({
      token: localStorage.getItem("auth_token"),
      email: localStorage.getItem("user_email"),
    });
  }, [localStorage.getItem("auth_token")]);
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">CinePrime</Navbar.Brand>
        <Link to="/login" />
      </Container>
    </Navbar>
  );
}
