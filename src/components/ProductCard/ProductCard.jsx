import React, { useEffect } from 'react'
import './ProductCard.css'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchProductStart,
  setProduct
} from '../../redux/Products/products.actions'
import { addProduct } from './../../redux/Cart/cart.actions'
import Button from '../forms/button/Button'
import { Col, Container, Row } from 'react-bootstrap'

const mapState = (state) => ({
  product: state.productsData.product
})

function ProductCard() {
  const dispatch = useDispatch()
  const history = useHistory()
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

  const handleAddToCart = (product) => {
    if (!product) return
    dispatch(addProduct(product))
    history.push('/cart')
  }

  return (
    <Container className='mt-5 p-3'>
      <Row>
        <Col xs={12} lg={6} className='d-flex align-items-center'>
          <div className='productCard__img'>
            <img
              src={productThumbnail}
              alt='product image'
              role={'productImg'}
            />
          </div>
        </Col>
        <Col xs={12} lg={6}>
          <div className='productCard__details' role='details'>
            <h2 className='productCard__detailsTitle' role='productName'>
              {productName}
            </h2>
            <div className='productCard__detailsPrice'>
              <span>Precio</span>
              <p>${productSellPrice}</p>
            </div>
            <Row>
              <Col
                xs={{ order: 'last' }}
                lg={{ order: 'first' }}
                className='mt-4'
              >
                <h2 className=''>Información del producto</h2>
                <div>
                  <h3>Beneficios</h3>
                  <p role='ben'> {productBenefits}</p>
                </div>
                <div className='mt-lg-3 '>
                  <h3>Caracteristicas</h3>
                  <p role='des'> {productDescription}</p>
                </div>
              </Col>

              <Col
                xs={({ order: 'first' }, 12)}
                lg={{ order: 'last' }}
                className='mt-4'
              >
                <Button
                  type='btnRegular'
                  onClick={() => handleAddToCart(product)}
                >
                  Agregar al carrito
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>

    // <div className='productCard__container container-sm d-flex flex-column'>
    //   <div className='productCard__img'>
    //     <img src={productThumbnail} alt='product image' role={'productImg'} />
    //   </div>
    // <div className='productCard__details' role='details'>
    //   <h2 className='productCard__detailsTitle' role='productName'>
    //     {productName}
    //   </h2>
    //   <div className='productCard__detailsPrice'>
    //     <span>Precio</span>
    //     <p>${productSellPrice}</p>
    //   </div>

    //   <div className='productCard__detailsInfo'>
    //     <h2>Información del producto</h2>
    //     <div>
    //       <h3>Beneficios</h3>
    //       <p role='ben'> {productBenefits}</p>
    //     </div>
    //     <div>
    //       <h3>Caracteristicas</h3>
    //       <p role='des'> {productDescription}</p>
    //     </div>

    //     <div className='productCard__btnCard'>
    //       <Button type='btnRegular' onClick={() => handleAddToCart(product)}>
    //         Agregar al carrito
    //       </Button>
    //     </div>
    //   </div>
    //   </div>
    // </div>
  )
}

export default ProductCard
