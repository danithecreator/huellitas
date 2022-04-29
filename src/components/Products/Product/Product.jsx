import React from 'react'
import './Product.css'
import { Link } from 'react-router-dom'
import Button from '../../forms/button/Button'
const Product = (
  { productThumbnail, productName, productSellPrice, documentID },
  key
) => {
  if (
    !documentID ||
    !productThumbnail ||
    !productName ||
    typeof productSellPrice === undefined
  )
    return null
  return (
    <div key={key} className='product'>
      <Link to={`/product/${documentID}`} role='productCard'>
        <div className='product__imgContainer'>
          <img
            className='product__img'
            src={productThumbnail}
            alt='product thumb'
          />
        </div>
        <div className='product__detail'>
          <p className='product__detailName' data-testid='nameP'>
            {productName}
          </p>
          <p className='product__detailPrice'>${productSellPrice}</p>
        </div>
      </Link>
      <Button type='btnCard'>Agregar al Carrito</Button>
    </div>
  )
}

export default Product
