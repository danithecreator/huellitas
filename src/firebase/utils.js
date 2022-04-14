import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import { firebaseConfig } from './config'

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const storage = firebase.storage()

export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
GoogleProvider.setCustomParameters({ prompt: 'select_account' })

export const handUserProfile = async ({ userAuth, additionalData }) => {
  if (!userAuth) return
  const { uid } = userAuth

  const userRef = firestore.doc(`users/${uid}`)
  const snapshot = await userRef.get()

  if (!snapshot.exists) {
    const { displayName, email } = userAuth
    const date = new Date()
    const userRoles = ['user']

    try {
      await userRef.set({
        displayName,
        email,
        createdDate: date,
        userRoles,
        ...additionalData
      })
    } catch (err) {
      // console.log(err)
    }
  }
  return userRef
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe()
      resolve(userAuth)
    }, reject)
  })
}
