import React from 'react';
import './Header.css';
import Logo from '../../assets/logo.svg';
import { connect } from 'react-redux';
import { auth } from '../../firebase/utils';
import { Link } from 'react-router-dom';

const Header = (props) => {
  const { currentUser } = props
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
              <li className='header__cta' onClick={() => auth.signOut()}>
                <span>Cerrar Sesión</span>
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

 const mapStateToProps = ({ user }) => ({
   currentUser: user.currentUser
 })

export default connect(mapStateToProps, null)(Header);
