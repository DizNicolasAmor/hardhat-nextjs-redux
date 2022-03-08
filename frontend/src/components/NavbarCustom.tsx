import React, { FC } from 'react';
import { Button, Nav, Navbar, Container } from 'react-bootstrap';

const NavbarCustom: FC = () => (
  <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="/">My ERC-20 dApp</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Nav.Link href="network">Network info</Nav.Link>
          <Nav.Link href="token">Token info</Nav.Link>
        </Nav>
        <Button variant="outline-primary">Connect</Button>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
export default NavbarCustom;
