import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CinePrimeNavbar() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" style={{ width: "100%" }}>
        <Container>
          <Navbar.Brand href="/">CinePrime</Navbar.Brand>
          <Link to="/login">Fazer Login</Link>
        </Container>
      </Navbar>
    </>
  );
}
