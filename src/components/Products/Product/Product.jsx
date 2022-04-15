import React from 'react'
import './Product.css'
import Button from '../../forms/button/Button'
const Product = ({ productThumbnail, productName, productSellPrice }, key) => {
  if (
    !productThumbnail ||
    !productName ||
    typeof productSellPrice === undefined
  )
    return null
  return (
    <div key={key} className='product'>
      <div className='product__imgContainer'>
        <img className='product__img' src={productThumbnail} alt='' />
      </div>
      <div className='product__detail'>
        <p className='product__detailName'>{productName}</p>
        <p className='product__detailPrice'>${productSellPrice}</p>
      </div>
      <Button type='btnCard'>Agregar al Carrito</Button>
    </div>
  )
}

export default Product
