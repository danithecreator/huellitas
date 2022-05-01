import React from 'react'
import './Product.css'
import { Link, useHistory } from 'react-router-dom'
import Button from '../../forms/button/Button'
import { useDispatch } from 'react-redux'
import { addProduct } from './../../../redux/Cart/cart.actions'

const Product = (product,key) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const {
    productThumbnail, 
    productName,
    productSellPrice,
    documentID 
  } = product;

  if (
    !documentID ||
    !productThumbnail ||
    !productName ||
    typeof productSellPrice === undefined
  )
    return null;

    const handleAddToCart = (product) => {
      if(!product) return ;
      dispatch(
        addProduct(product)
      );
      history.push('/cart');
    };

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
      <Button type='btnCard' onClick={()=> handleAddToCart(product)}>
        Agregar al Carrito
        </Button>
    </div>
  )
}

export default Product
