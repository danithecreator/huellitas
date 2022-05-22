import React from 'react'
import './Header.css'
import Logo from '../../assets/logo.svg'

import { useSelector, useDispatch } from 'react-redux'
import { signOutUserStart } from '../../redux/User/user.actions'
import { selectCartItemsCount } from '../../redux/Cart/cart.selectors'
import { Link } from 'react-router-dom'
import { Container, Nav, Navbar } from 'react-bootstrap'

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  totalNumCartitems: selectCartItemsCount(state)
})

const Header = (_props) => {
  const dispatch = useDispatch()
  const { currentUser, totalNumCartitems } = useSelector(mapState)

  const signOut = () => {
    dispatch(signOutUserStart())
  }

  return (
    <Navbar bg='light' expand='lg' className='header shadow-sm'>
      <Container>
        <Navbar.Brand>
          <div className='header__logo'>
            <Link to='/'>
              <img src={Logo} alt='logo de la tienda' />
            </Link>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link>
              <Link className='header__cta' to='/'>
                Inicio
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className='header__cta' to='/search'>
                Buscar
              </Link>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link>
              <Link to='/cart' className='header__cta'>
                Tu carrito ({totalNumCartitems})
              </Link>
            </Nav.Link>
            {currentUser && [
              <Nav.Link eventKey={2}>
                <Link className='header__cta' to='/dashboard'>
                  Mi cuenta
                </Link>
              </Nav.Link>,
              <Nav.Link eventKey={3}>
                <li onClick={() => signOut()}>
                  <a className='header__cta'>Cerrar Sesion</a>
                </li>
              </Nav.Link>
            ]}
            {!currentUser && [
              <Nav.Link eventKey={2}>
                <Link className='header__cta' to='/registration'>
                  Registro
                </Link>
              </Nav.Link>,
              <Nav.Link eventKey={3}>
                <Link className='header__cta' to='/login'>
                  Inicia Sesion
                </Link>
              </Nav.Link>
            ]}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
Header.defaulProps = {
  currentUser: null
}

export default Header
