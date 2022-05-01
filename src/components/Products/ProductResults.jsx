import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { fetchProductsStart } from '../../redux/Products/products.actions'
import FormSelect from '../forms/formSelect/FormSelect'
import LoadMore from '../LoadMore/LoadMore'
import Product from './Product/Product'
import './ProductResults.css'

const mapState = ({ productsData }) => ({
  products: productsData.products
})

function ProductResults() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [productCategory, setProductCategory] = useState('')
  const { filterByPet, filterByCat } = useParams()
  const { products } = useSelector(mapState)
  const { data, queryDoc, isLastPage } = products
  let petFilter
  let catFilter

  useEffect(() => {
    dispatch(fetchProductsStart({ filterByPet, filterByCat }))
  }, [filterByPet, filterByCat])

  const handleFilterByPet = (e) => {
    petFilter = e.target.value

    history.push(`/search/${petFilter}`)
    setProductCategory('')
  }
  const handleFilterByCat = (e) => {
    catFilter = e.target.value
    setProductCategory(catFilter)
    history.push(`/search/${filterByPet}/${catFilter}`)
  }
  const handleLoadMore = () => {
    dispatch(
      dispatch(
        fetchProductsStart({
          filterByPet,
          filterByCat,
          startAfterDoc: queryDoc,
          persistProducts: data
        })
      )
    )
  }

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore
  }

  if (!Array.isArray(data)) return null

  const configFiltersByPet = {
    defaultValue: filterByPet,
    options: [
      {
        name: 'Mostrar todos',
        value: ''
      },
      {
        name: 'Perros',
        value: 'perros'
      },
      {
        name: 'Gatos',
        value: 'gatos'
      }
    ],
    handleChange: handleFilterByPet
  }
  const configFiltersByCat = {
    defaultValue: productCategory,
    options: [
      {
        name: 'Mostrar todos',
        value: ''
      },
      {
        name: 'Alimento',
        value: 'alimento'
      },
      {
        name: 'Snacks',
        value: 'snacks'
      },
      {
        name: 'Cuidado',
        value: 'cuidado'
      },
      {
        name: 'Juguetes',
        value: 'juguetes'
      }
    ],
    handleChange: handleFilterByCat
  }
  if (data.length < 1) {
    return (
      <div className='productResult'>
        <h1 className='productResult__title'>Encuentra todo para tu mascota</h1>
        <div className='productResult__filters'>
          <FormSelect
            selectStyle='formSelectBig'
            {...configFiltersByPet}
          ></FormSelect>
          {filterByPet && (
            <FormSelect
              selectStyle='formSelectBig'
              {...configFiltersByCat}
            ></FormSelect>
          )}
        </div>

        <h2>No se encontraron resultados</h2>
      </div>
    )
  }

  return (
    <div className='productResult'>
      <h1 className='productResult__title'>Encuentra todo para tu mascota</h1>
      <div className='productResult__filters'>
        <FormSelect
          selectStyle='formSelectBig'
          {...configFiltersByPet}
        ></FormSelect>
        {filterByPet && (
          <FormSelect
            selectStyle='formSelectBig'
            {...configFiltersByCat}
          ></FormSelect>
        )}
      </div>
      <div className='productResult__store' role='list'>
        {data.map((product, pos) => {
          const { productThumbnail, productName, productSellPrice } = product
          if (
            !productThumbnail ||
            !productName ||
            typeof productSellPrice === undefined
          )
            return null

          const configProduct = {
            ...product
          }
          return <Product {...configProduct} key={pos}></Product>
        })}
      </div>
      {!isLastPage && <LoadMore {...configLoadMore}></LoadMore>}
    </div>
  )
}

export default ProductResults
