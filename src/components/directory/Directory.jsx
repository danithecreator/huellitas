import React from 'react'
import { Link } from 'react-router-dom'
import ShopDog from '../../assets/dog-hero.jpg'
import ShopCat from '../../assets/cat-hero.jpg'
import './Directory.css'
const Directory = () => {
  return (
    <div className='directory'>
      <div className='directory__wrap'>
        <div className='directory__item'>
          <div className='directory__overlay'></div>
          <img className='directory__image' src={ShopDog} alt='' />
          <Link className='directory__cta' to='/search/perros'>
            Perros
          </Link>
        </div>
        <div className='directory__item'>
          <div className='directory__overlay'></div>
          <img className='directory__image' src={ShopCat} alt='' />
          <Link className='directory__cta' to='/search/gatos'>
            Gatos
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Directory
