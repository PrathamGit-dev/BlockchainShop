import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';



export const NavBar = (props) => {
  const customer = props.customer;
  const visit_count = customer[2];
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        {props.address == undefined &&
          <Navbar.Brand><Button variant="primary" onClick={props.ConnectWalletHandler}>{props.connect_wallet_msg}</Button></Navbar.Brand>}
          <Navbar.Brand><Nav.Link href="/">Home</Nav.Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/about">About</Nav.Link>
            {props.customer[2] != 0 && 
            <Nav.Link href="/transactions">Transactions</Nav.Link>
            }
            {props.address == props.shopOwner &&
              <Nav.Link href="/AddItem">Add Item</Nav.Link>}
            <Nav.Link href="/help">Help</Nav.Link>


            <NavDropdown title="Your Details" id="basic-nav-dropdown">
              <NavDropdown.Item>{customer[0]}</NavDropdown.Item>
              <NavDropdown.Item>{customer[1]}</NavDropdown.Item>
              <NavDropdown.Item>{props.address}</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
