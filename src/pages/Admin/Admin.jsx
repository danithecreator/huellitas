import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addProductStart,
  fetchProductsStart,
  deleteProductStart
} from '../../redux/Products/products.actions'
import { storage } from '../../firebase/utils'
import FormInput from '../../components/forms/formInput/FormInput'
import FormSelect from '../../components/forms/formSelect/FormSelect'
import Button from '../../components/forms/button/Button'
import Modal from '../../components/modal/Modal'
import FormTextArea from '../../components/forms/formTextArea/FormTextArea'
import FormFileUpload from '../../components/forms/formFileUpload/FormFileUpload'

import './admin.css'

const mapState = ({ productsData }) => ({
  products: productsData.products
})

const Admin = (props) => {
  const { products } = useSelector(mapState)
  const dispatch = useDispatch()
  const [hideModal, setHideModal] = useState(true)
  const [productCategory, setProductCategory] = useState('alimento')
  const [productPet, setProductPet] = useState('perro')
  const [productName, setProductName] = useState('')
  const [productBenefits, setProductBenefits] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productThumbnail, setProductThumbnail] = useState('')
  const [productSellPrice, setProductSellPrice] = useState('')
  const [productBuyPrice, setProductBuyPrice] = useState('')
  const [productStock, setProductStock] = useState('')
  const [uploadValue, setUploadValue] = useState(0)
  const [isUnable, setIsUnable] = useState(true)
  const [productErrors, setProductErrors] = useState([])

  useEffect(() => {
    dispatch(fetchProductsStart())
  }, [])

  const toggleModal = () => {
    setHideModal(!hideModal), resetErrors()
  }

  const configModal = {
    hideModal,
    toggleModal
  }

  const resetErrors = () => {
    setProductErrors([])
  }
  const resetForm = () => {
    setHideModal(true)
    setProductCategory('alimento')
    setProductName('')
    setProductThumbnail('')
    setProductSellPrice('')
    setProductBuyPrice('')
    setProductStock('')
    setProductBenefits('')
    setProductDescription('')
    setProductPet('perro')
    setUploadValue(0)
    setIsUnable(true)
    setProductErrors([])
  }

  const handleUpload = (e) => {
    const file = e.target.files[0]
    const storageRef = storage.ref(`/productImages/${file.name}`)
    const task = storageRef.put(file)
    task.on(
      'statae_changed',
      (snapshot) => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setUploadValue(percentage)
      },
      (error) => {
        console.log(error.message)
      },
      () => {
        storageRef.getDownloadURL().then((url) => {
          setProductThumbnail(url)
        })
      }
    )
  }

  const invalidForm = () => {
    let isValid = true
    if (productName.length === 0 || productName.trim() === '') {
      setProductErrors((oldErrors) => [
        ...oldErrors,
        'Ingrese el nombre del producto'
      ])
      isValid = false
    }

    if (productSellPrice === '' || productSellPrice <= 0) {
      setProductErrors((oldErrors) => [
        ...oldErrors,
        'Ingrese el precio de venta del producto, este tiene que se mayor a $0'
      ])
      isValid = false
    }

    if (productBuyPrice === '' || productBuyPrice <= 0) {
      setProductErrors((oldErrors) => [
        ...oldErrors,
        'Ingrese el precio de compra del producto, este tiene que se mayor a $0'
      ])
      isValid = false
    }
    if (productStock === '' || productStock <= 0) {
      setProductErrors((oldErrors) => [
        ...oldErrors,
        'Ingrese la cantidad de stock del producto, este tiene que se mayor a 0'
      ])

      if (productThumbnail < 100) {
        setProductErrors((oldErrors) => [
          ...oldErrors,
          'La imagen aun no se ha subido'
        ])
        isValid = false
      }
    }

    console.log(productErrors)
    return isValid
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (invalidForm() === true) {
      dispatch(
        addProductStart({
          productPet,
          productCategory,
          productName,
          productBenefits,
          productDescription,
          productThumbnail,
          productSellPrice,
          productBuyPrice,
          productStock
        })
      )
      resetForm()
    }
  }

  return (
    <div className='admin'>
      <div className='callToActions'>
        <ul>
          <li>
            <Button type='btnDashboard' onClick={() => toggleModal()}>
              Añadir nuevo producto
            </Button>
          </li>
        </ul>
      </div>

      <Modal {...configModal}>
        <div className='addProduct__formContainer'>
          <h2 className='addProduct__title'>Añadir nuevo producto</h2>
          {productErrors.map((err, index) => {
            return (
              <li
                className='
                 addProduct__error'
                key={index}
              >
                {err}
              </li>
            )
          })}
          <form className='addProduct__form' onSubmit={handleSubmit}>
            <div className='addProduct__selectors'>
              <FormSelect
                label='Tipo mascota'
                options={[
                  {
                    value: 'perros',
                    name: 'Perros'
                  },
                  {
                    value: 'gatos',
                    name: 'Gatos'
                  }
                ]}
                handleChange={(e) => setProductPet(e.target.value)}
              />
              <FormSelect
                label='Categoria'
                options={[
                  {
                    value: 'alimento',
                    name: 'Alimento'
                  },
                  {
                    value: 'snacks',
                    name: 'Snacks'
                  },
                  {
                    value: 'cuidado',
                    name: 'Cuidado e Higiene'
                  },
                  {
                    value: 'juguetes',
                    name: 'Juguetes'
                  }
                ]}
                handleChange={(e) => setProductCategory(e.target.value)}
              />
            </div>
            <div className='addProduct__formCols'>
              <div className='addProduct__col'>
                <FormInput
                  label='Nombre'
                  type='text'
                  styleclass='difInput'
                  value={productName}
                  handleChange={(e) => setProductName(e.target.value)}
                />
                <FormTextArea
                  label='Beneficios'
                  type='text'
                  styleclass='textArea'
                  value={productBenefits}
                  handleChange={(e) => setProductBenefits(e.target.value)}
                />
                <FormTextArea
                  label='Descripcion'
                  type='text'
                  styleclass='textArea'
                  value={productDescription}
                  handleChange={(e) => setProductDescription(e.target.value)}
                />
              </div>
              <div className='addProduct__col'>
                <FormInput
                  label='Precio Compra'
                  type='number'
                  styleclass='difInput'
                  min='0'
                  max='100000000'
                  step='1'
                  value={productBuyPrice}
                  handleChange={(e) => setProductBuyPrice(e.target.value)}
                />

                <FormInput
                  label='Precio Venta'
                  type='number'
                  styleclass='difInput'
                  min='0'
                  max='100000000'
                  step='1'
                  value={productSellPrice}
                  handleChange={(e) => setProductSellPrice(e.target.value)}
                />
                <FormInput
                  label='Cantidad en Stock'
                  type='number'
                  styleclass='difInput'
                  min='0'
                  max='100000000'
                  step='1'
                  value={productStock}
                  handleChange={(e) => setProductStock(e.target.value)}
                />
                <FormFileUpload
                  uploadValue={uploadValue}
                  handleUpload={handleUpload}
                />
              </div>
            </div>

            <br />
            <Button type='btnRegular'>Añadir Producto</Button>
          </form>
        </div>
      </Modal>

      <div className='manageProducts'>
        <table border='0' cellPadding='0' cellSpacing='0'>
          <tbody>
            <tr>
              <th>
                <h1 className='manageProducts__title'>Administrar Productos</h1>
              </th>
            </tr>
            <tr>
              <td>
                <table
                  className='results'
                  border='0'
                  cellPadding='10'
                  cellSpacing='0'
                >
                  <tbody>
                    <tr className='results__header'>
                      <th>Imagen</th>
                      <th>Nombre</th>
                      <th>Tipo Mascota</th>
                      <th>Categoria</th>
                      <th>Precio Compra</th>
                      <th>Precio Venta</th>
                      <th>Stock</th>
                    </tr>
                    {Array.isArray(products) &&
                      products.length > 0 &&
                      products.map((product, index) => {
                        const {
                          productName,
                          productPet,
                          productCategory,
                          productBuyPrice,
                          productSellPrice,
                          productStock,
                          productThumbnail,
                          documentID
                        } = product

                        return (
                          <tr className='results__cell' key={index}>
                            <td className='results__thumb'>
                              <img src={productThumbnail} />
                            </td>
                            <td>{productName}</td>
                            <td>{productPet}</td>
                            <td>{productCategory}</td>
                            <td>${productBuyPrice}</td>
                            <td>${productSellPrice}</td>
                            <td>{productStock}</td>
                            <td>
                              <Button
                                type='btnTable'
                                onClick={() =>
                                  dispatch(deleteProductStart(documentID))
                                }
                              >
                                Eliminar
                              </Button>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Admin
