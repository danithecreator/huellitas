import { firestore } from './../../firebase/utils'

export const handleAddProduct = (product) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('products')
      .doc()
      .set(product)
      .then(() => {
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const handleFetchProducts = ({
  filterByPet,
  filterByCat,
  startAfterDoc,
  persistProducts = []
}) => {
  return new Promise((resolve, reject) => {
    const pageSize = 6

    let ref = firestore
      .collection('products')
      .orderBy('createdDate')
      .limit(pageSize)
    if (filterByPet) ref = ref.where('productPet', '==', filterByPet)
    if (filterByCat) ref = ref.where('productCategory', '==', filterByCat)
    if (startAfterDoc) ref = ref.startAfter(startAfterDoc)
    ref
      .get()
      .then((snapshot) => {
        const totalCount = snapshot.size
        const data = [
          ...persistProducts,
          ...snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              documentID: doc.id
            }
          })
        ]
        resolve({
          data,
          queryDoc: snapshot.docs[totalCount - 1],
          isLastPage: totalCount < pageSize
        })
      })
      .catch((err) => {
        reject(err)
      })
  })
}
export const handleDeleteProduct = (documentID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('products')
      .doc(documentID)
      .delete()
      .then(() => {
        console.log(documentID, 2)
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const handleEditProduct = (product) => {
  console.log(product)
  return new Promise((resolve, reject) => {
    firestore
      .collection('products')
      .doc(product.documentID)
      .update({
        productPet: product.productPet,
        productCategory: product.productCategory,
        productName: product.productName,
        productBenefits: product.productBenefits,
        productDescription: product.productDescription,
        productThumbnail: product.productThumbnail,
        productSellPrice: product.productSellPrice,
        productBuyPrice: product.productBuyPrice,
        productStock: product.productStock
      })
      .then(() => {
        resolve()
      })
      .catch((err) => {
        console.log(err)
        reject()
      })
  })
}

export const handleFetchProduct = (productID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('products')
      .doc(productID)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          resolve(snapshot.data())
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}
