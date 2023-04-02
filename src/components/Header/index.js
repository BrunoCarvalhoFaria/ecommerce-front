import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from "react";

export default function Header() {
  return (
    <>
      <header>
        <Navbar bg="primary" variant="dark" className="justify-content-end">
          <Container>
            <Navbar.Brand href="/">Dev. Bruno</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Início</Nav.Link>
              <Nav.Link href="cadastro">Cadastro</Nav.Link>
            </Nav>
          </Container>
        </Navbar>{" "}
      </header>
    </>
  );
}
