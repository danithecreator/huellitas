import React from 'react'
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
          <a className='directory__cta' href=''>
            Perros
          </a>
        </div>
        <div className='directory__item'>
          <div className='directory__overlay'></div>
          <img className='directory__image' src={ShopCat} alt='' />
          <a className='directory__cta' href='/'>
            Gatos
          </a>
        </div>
      </div>
    </div>
  )
}

export default Directory
