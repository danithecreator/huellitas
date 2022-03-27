import React from 'react'
import './Header.css'
import Logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom'
const Header = () => {
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
              <Link className='header__cta' to='/registration'>
                Registro
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Header
