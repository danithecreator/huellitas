import React from 'react'
import './Header.css'
import Logo from '../../assets/logo.svg'

const header = () => {
  return (
    <div className='header'>
      <div className='header__wrap'>
        <div className='header__logo'>
          <img src={Logo} alt='logo de la tienda' />
        </div>
      </div>
    </div>
  )
}

export default header
