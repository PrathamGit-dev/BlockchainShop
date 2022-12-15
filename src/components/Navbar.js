import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';



export const NavBar = (props) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>

        <Navbar.Brand href="#home"><Button variant="primary" onClick={props.ConnectWalletHandler}>{props.connect_wallet_msg}</Button></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="/about">About</Nav.Link> */}
            {/* <Navbar.Brand href="#home"><Button variant="primary" onClick={AddCustomer}>Add as customer</Button></Navbar.Brand> */}
            {props.address == null &&

              <Navbar.Brand href="#home"><Button variant="primary" onClick={props.AddCustomer}>Add as customer</Button></Navbar.Brand>

            }

            {/* <NavDropdown title="Update your shop" id="basic-nav-dropdown">
              {items.map(item => (  
                <Dropdown.Item>{item[0]}  - {item[2]} no.s  - &#x20b9;{item[1]}/-<Button variant="primary" onClick={ () => updateQuantity(item[0], item[1], 10)}>Add 10 more</Button>
                </Dropdown.Item>
              ))}    
              <Dropdown.Item>Add new Item<Button variant="primary" onClick={ () => AddNewItemHandler('E', 25, 50)}>Add {'E'}</Button>
                </Dropdown.Item>
            </NavDropdown> */}


            <NavDropdown title="Your Details" id="basic-nav-dropdown">
              {/* <NavDropdown.Item href="">{customer[0]}</NavDropdown.Item> */}
              {/* <NavDropdown.Item href="">{customer[1]}</NavDropdown.Item> */}
              <NavDropdown.Item href="#action/3.3">{props.address}</NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
              <NavDropdown.Item >
                {/* <button className="btn btn-secondary my-2" onClick={updateQuantity("A",10,10)}>
                Update A
                </button> */}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
