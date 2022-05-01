import React from 'react'
import './Header.css'
import Logo from '../../assets/logo.svg'

import { useSelector, useDispatch } from 'react-redux'
import { signOutUserStart } from '../../redux/User/user.actions'
import { selectCartItemsCount } from '../../redux/Cart/cart.selectors'
import { Link } from 'react-router-dom'

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  totalNumCartitems: selectCartItemsCount(state)
})

const Header = (props) => {
  const dispatch = useDispatch()
  const { currentUser, totalNumCartitems } = useSelector(mapState)

  const signOut = () => {
    dispatch(signOutUserStart())
  }

  return (
    <div className='header'>
      <div className='header__wrap'>
        <div className='header__logo'>
          <Link to='/'>
            <img src={Logo} alt='logo de la tienda' />
          </Link>
        </div>

        <nav className='header__ctas'>
          <ul>
            <li>
              <Link className='header__cta' to='/search'>
                Buscar
              </Link>
            </li>
            <li>
              <Link className='header__cta' to='/'>
                Inicio
              </Link>
            </li>
          </ul>
        </nav>

        <div className='header__ctas'>

          <ul>

            <li>
              <Link to="/cart">
                Tu carrito ({totalNumCartitems})
              </Link>
            </li>

            {currentUser && [
                <li>
                  <Link className='header__cta' to='/dashboard'>
                    Mi cuenta
                  </Link>
                </li>,
                <li onClick={() => signOut()}>
                  <a className='header__cta'>Cerrar Sesion</a>
                </li>
                 ]}

            {!currentUser && [
                <li>
                  <Link className='header__cta' to='/registration'>
                    Registro
                  </Link>
                </li>,
                <li>
                  <Link className='header__cta' to='/login'>
                    Inicia Sesion
                  </Link>
                </li>
            ]}
          </ul>


        </div>
      </div>
    </div>
  )
}
Header.defaulProps = {
  currentUser: null
}

export default Header
