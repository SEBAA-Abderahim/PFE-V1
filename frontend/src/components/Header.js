//using ES7 React/Redux/GraphQL/React-Native snippets we call rfce to have a react functional component
import React from 'react'
import { Navbar,Nav,Container,Row  } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
//gett icons from here https://cdnjs.com/ and then copy font awsome tag ling in index.html
//user icon https://fontawesome.com/icons/user?style=solid
function Header() {
    return (
        <header>
            <header>

            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                <LinkContainer to="/">
  <Navbar.Brand >ShopsDz</Navbar.Brand>
  </LinkContainer>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <LinkContainer to="/login">
          
      <Nav.Link ><i className="fas fa-user"></i>Se connecter</Nav.Link>
      </LinkContainer>

      
    </Nav>
   
  </Navbar.Collapse>
  </Container>
</Navbar>
            </header>
        </header>
    )
}

export default Header

