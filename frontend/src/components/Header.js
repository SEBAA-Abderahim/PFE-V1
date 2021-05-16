//using ES7 React/Redux/GraphQL/React-Native snippets we call rfce to have a react functional component
import React, { Fragment, useState } from 'react'
import { Navbar,Nav,Container,Row  } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { connect } from 'react-redux';
import { logout } from '../actions/auth'
import { Link, Redirect } from 'react-router-dom';
import SearchBox from './SearchBox'
//gett icons from here https://cdnjs.com/ and then copy font awsome tag ling in index.html
//user icon https://fontawesome.com/icons/user?style=solid
function Header({ logout, isAuthenticated ,user}) {
  const [redirect, setRedirect] = useState(false);

  const logout_user = () => {
      logout();
      setRedirect(true);
  };

  const guestLinks = () => (
      <Fragment   className="nav ml-auto">
          <li className='nav-item '  >
            <LinkContainer to="/login">
          <Nav.Link ><i className="fas fa-user"></i>Se connecter</Nav.Link>
          </LinkContainer>
          </li>
          <li className='nav-item'>
          <LinkContainer to="/signup">
          <Nav.Link ><i class="fas fa-user-plus"></i>S'inscrire</Nav.Link>
          </LinkContainer>
          </li>
      </Fragment>
  );

  const authLinks = () => (
    <Fragment  className="nav ml-auto">
   
      <li className='nav-item'>
          <a className='nav-link' href='#!' ><i class="fas fa-user"></i>{user?user.username:""}</a>
      </li>
      <li className='nav-item'>
    <a className='nav-link' href='/' onClick={logout_user}><i class="fas fa-sign-out-alt"></i>Logout</a>
</li>
      </Fragment>

  );
    return (
        <header>
        

            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                <LinkContainer to="/">
  <Navbar.Brand >ShopsDz</Navbar.Brand>
  </LinkContainer>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse  className="justify-content-start">
  <SearchBox />
    <Nav className= "ml-auto">
    {isAuthenticated ? authLinks() : guestLinks()}

      
    </Nav>
   
  </Navbar.Collapse>
  </Container>
</Navbar>
{redirect ? <Redirect to='/' /> : <Fragment></Fragment>}
            </header>
      
    )
}


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user:state.auth.user
});

export default connect(mapStateToProps, { logout })(Header);

