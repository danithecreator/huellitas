import React, { useEffect } from 'react'
import './ProductCard.css'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchProductStart,
  setProduct
} from '../../redux/Products/products.actions'
import Button from '../forms/button/Button'

const mapState = (state) => ({
  product: state.productsData.product
})

function ProductCard() {
  const dispatch = useDispatch()
  const { productID } = useParams()
  const { product } = useSelector(mapState)

  const {
    productThumbnail,
    productName,
    productSellPrice,
    productBenefits,
    productDescription
  } = product

  useEffect(() => {
    dispatch(fetchProductStart(productID))
    return () => {
      dispatch(setProduct({}))
    }
  }, [])
  return (
    <div className='productCard__container'>
      <div className='productCard__img'>
        <img src={productThumbnail} alt='product image' role={'productImg'} />
      </div>
      <div className='productCard__details' role='details'>
        <h2 className='productCard__detailsTitle' role='productName'>
          {productName}
        </h2>
        <div className='productCard__detailsPrice'>
          <span>Precio</span>
          <p>${productSellPrice}</p>
        </div>

        <div className='productCard__detailsInfo'>
          <h2>Información del producto</h2>
          <div>
            <h3>Beneficios</h3>
            <p role='ben'> {productBenefits}</p>
          </div>
          <div>
            <h3>Caracteristicas</h3>
            <p role='des'> {productDescription}</p>
          </div>

          <div className='productCard__btnCard'>
            <Button type='btnRegular'>Agregar al carrito</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
