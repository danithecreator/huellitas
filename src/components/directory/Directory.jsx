import React from 'react'
import { Link } from 'react-router-dom'
import ShopDog from '../../assets/dog-hero.jpg'
import ShopCat from '../../assets/cat-hero.jpg'
import './Directory.css'
const Directory = () => {
  return (
    <div className='row m-lg-3 '>
      <div className='col-md-6 position-relative h-100 '>
        <img className='directory__item' src={ShopDog} alt='' />
        <Link className='directory__cta' to='/search/perros'>
          Perros
        </Link>
      </div>
      <div className='col-md-6 position-relative h-100'>
        <img className='directory__item' src={ShopCat} alt='' />
        <Link className='directory__cta ' to='/search/gatos'>
          Gatos
        </Link>
      </div>
    </div>
  )
}

export default Directory
