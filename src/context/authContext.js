import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth'
import { auth, firestore } from '../firebase/utils'

export const authContext = createContext()
export const useAuth = () => {
  const context = useContext(authContext)
  if (!context) throw new Error('There is no auth provider')
  return context
}
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const signup = (name, email, password) => {
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredentials) => {
        const { user } = userCredentials
        updateProfile(user, { displayName: name })
      }
    )
  }
  const emailAndPasswordLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
  }
  const logout = () => {
    signOut(auth)
  }
  const loginWhitGoogle = () => {
    const googleProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleProvider)
  }
  const handleUserProfile = async (currentUser, additionalData) => {
    if (!currentUser) return
    const { uid } = currentUser
    const userRef = firestore.doc(`users/${uid}`)
    const snapshot = await userRef.get()

    if (!snapshot.exist) {
      const { displayName, email } = currentUser
      const date = new Date()
      const userRoles = ['user']

      try {
        await userRef.set({
          displayName,
          email,
          createDate: date,
          userRoles,
          ...additionalData
        })
      } catch (error) {
        console.log(error)
      }
    }
    return userRef
  }
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      handleUserProfile(currentUser)
      setUser(currentUser)
    })
  }, [])
  return (
    <authContext.Provider
      value={{ signup, emailAndPasswordLogin, user, logout, loginWhitGoogle }}
    >
      {children}
    </authContext.Provider>
  )
}
