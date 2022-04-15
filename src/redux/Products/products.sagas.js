import { auth } from '../../firebase/utils'
import { takeLatest, put, all, call } from 'redux-saga/effects'
import productsTypes from './products.types'
import {
  handleAddProduct,
  handleFetchProducts,
  handleDeleteProduct
} from './products.helpers'
import { fetchProductsStart, setProducts } from './products.actions'

export function* addProduct({
  payload: {
    productPet,
    productCategory,
    productName,
    productBenefits,
    productDescription,
    productThumbnail,
    productSellPrice,
    productBuyPrice,
    productStock
  }
}) {
  const createdDate = new Date()
  try {
    yield handleAddProduct({
      productPet,
      productCategory,
      productName,
      productBenefits,
      productDescription,
      productThumbnail,
      productSellPrice,
      productBuyPrice,
      productStock,
      productAdminUserUID: auth.currentUser.uid,
      createdDate: createdDate
    })
    yield put(fetchProductsStart())
  } catch (error) {
    console.log(error)
  }
}

export function* onAddProductStart() {
  yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct)
}
export function* fetchProducts({ payload }) {
  try {
    const products = yield handleFetchProducts(payload)
    yield put(setProducts(products))
  } catch (error) {
    console.log(error)
  }
}

export function* onFetchProductsStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts)
}

export function* deleteProduct({ payload }) {
  try {
    yield handleDeleteProduct(payload)
    yield put(fetchProductsStart())
  } catch (err) {
    console.log(err)
  }
}

export function* onDeleteProductStart() {
  yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProduct)
}

export default function* productsSagas() {
  yield all([
    call(onAddProductStart),
    call(onFetchProductsStart),
    call(onDeleteProductStart)
  ])
}
