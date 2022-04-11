import React from 'react'
import './Header.css'
import Logo from '../../assets/logo.svg'
import { useSelector, useDispatch } from 'react-redux'
import { signOutUserStart } from '../../redux/User/user.actions'
import { Link } from 'react-router-dom'

const mapState = ({ user }) => ({
  currentUser: user.currentUser
})

const Header = (props) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(mapState)

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  return (
    <div className='header'>
      <div className='header__wrap'>
        <div className='header__logo'>
          <Link to='/'>
            <img src={Logo} alt='logo de la tienda' />
          </Link>
        </div>

        <nav className='header__ctas'>
          {currentUser && (
            <ul>
              <li>
                <Link className='header__cta' to='/dashboard'>
                  My Account
                </Link>
              </li>
              <li onClick={() => signOut()}>
                <span className='header__cta'>Cerrar Sesión</span>
              </li>
            </ul>
          )}

          {!currentUser && (
            <ul>
              <li>
                <Link className='header__cta' to='/registration'>
                  Registro
                </Link>
              </li>
              <li>
                <Link className='header__cta' to='/login'>
                  Inicia Sesion
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </div>
  )
}
Header.defaulProps = {
  currentUser: null
}

export default Header
