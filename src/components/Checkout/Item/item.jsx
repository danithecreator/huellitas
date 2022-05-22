import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import ClearIcon from '@mui/icons-material/Clear'
import RemoveIcon from '@mui/icons-material/Remove'
import { Col, Row } from 'react-bootstrap'
import './item.css'
import { useDispatch } from 'react-redux'
import {
  removeCartItem,
  addProduct,
  reduceCartItem
} from '../../../redux/Cart/cart.actions'
import Button from '../../forms/button/Button'

const Item = (product) => {
  const dispatch = useDispatch()
  const {
    productName,
    productThumbnail,
    productSellPrice,
    quantity,
    documentID
  } = product

  const handleRemoveCartItem = (documentID) => {
    dispatch(
      removeCartItem({
        documentID
      })
    )
  }

  const handleAddProduct = (product) => {
    dispatch(addProduct(product))
  }

  const handleReduceItem = (product) => {
    dispatch(reduceCartItem(product))
  }

  return (
    <div className='container w-100 item-row p-4'>
      <Row>
        <Col className='col-sm-6 col-lg-2'>
          <img class='img-item' src={productThumbnail} alt={productName}></img>
        </Col>
        <Col className='col-sm-6 col-lg-10 '>
          <Row className='text-uppercase mb-3 mobileLayout d-none d-lg-flex '>
            <Col lg={3} className='fw-bold'>
              Nombre:
            </Col>
            <Col lg={3} className='fw-bold'>
              Precio:
            </Col>
            <Col lg={3} className='fw-bold '>
              Cantidad:
            </Col>
            <Col lg={3} className='fw-bold'></Col>
          </Row>
          <Row className=' d-flex align-items-center justify-content-center'>
            <Col lg={3} className='text-capitalize mobileLayout'>
              {productName}
            </Col>
            <Col lg={3} className='mobileLayout'>
              <p> ${productSellPrice}</p>
            </Col>
            <Col lg={3} className='ctaCart'>
              <div
                className='roundedQuantity shadow me-1 roundedIconCont '
                onClick={() => handleReduceItem(product)}
              >
                <RemoveIcon color='success'></RemoveIcon>
              </div>

              <div className='roundedQuantity shadow '>{quantity}</div>

              <div
                className='roundedQuantity shadow ms-1 roundedIconCont'
                onClick={() => handleAddProduct(product)}
              >
                <AddIcon></AddIcon>
              </div>
            </Col>
            <Col
              lg={3}
              className='d-flex flex-row justify-content-center  d-none d-lg-flex'
            >
              <div
                className='roundedQuantity shadow ms-1 roundedIconCont '
                onClick={() => handleRemoveCartItem(documentID)}
              >
                <ClearIcon></ClearIcon>
              </div>
            </Col>
            <Col
              lg={3}
              className='d-flex flex-row justify-content-start mt-4 d-lg-none d-md-block '
            >
              <Button
                type='btnRegular'
                onClick={() => handleRemoveCartItem(documentID)}
              >
                Eliminar
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
    /*  <table className='table'>
      <thead>
        <tr>
          <th scope='col'>Producto</th>
          <th scope='col'>Descripción</th>
          <th scope='col'>Cantidad</th>
          <th scope='col'>Precio</th>
          <th scope='col'>Eliminar</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>
            <img
              class='img-item'
              src={productThumbnail}
              alt={productName}
            ></img>
          </td>
          <td>{productName}</td>
          <td>
            <span className='cartBtn' onClick={() => handleReduceItem(product)}>
              {'<'}
            </span>
            <span>{quantity}</span>
            <span className='cartBtn' onClick={() => handleAddProduct(product)}>
              {'>'}
            </span>
          </td>
          <td>${productSellPrice}</td>
          <td align='center'>
            <span
              className='cartBtn'
              onClick={() => handleRemoveCartItem(documentID)}
            >
              X
            </span>
          </td>
        </tr>
      </tbody>
    </table> */
  )
}

export default Item
