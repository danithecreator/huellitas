import React from 'react'
import './Product.css'
import { Link, useHistory } from 'react-router-dom'
import Button from '../../forms/button/Button'
import { useDispatch } from 'react-redux'
import { addProduct } from './../../../redux/Cart/cart.actions'
import { Card } from 'react-bootstrap'

const Product = (product, key) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { productThumbnail, productName, productSellPrice, documentID } =
    product

  if (
    !documentID ||
    !productThumbnail ||
    !productName ||
    typeof productSellPrice === undefined
  )
    return null

  const handleAddToCart = (product) => {
    if (!product) return
    dispatch(addProduct(product))
    history.push('/cart')
  }

  return (
    <Card className='product pt-3'>
      <Link to={`/product/${documentID}`} id={documentID} role='productCard'>
        <div className='d-flex align-content-center justify-content-center '>
          <Card.Img
            variant='top'
            className='product__img '
            src={productThumbnail}
            alt='product thumb'
          />
        </div>
        <Card.Body>
          <Card.Title>
            <p className='product__detailName' data-testid='nameP'>
              {productName}
            </p>
          </Card.Title>
          <Card.Text className='mb-3 '>${productSellPrice}</Card.Text>
        </Card.Body>
      </Link>

      <Button type='btnCard' onClick={() => handleAddToCart(product)}>
        Agregar al Carrito
      </Button>
    </Card>
  )
}

export default Product
