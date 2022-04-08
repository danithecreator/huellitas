import userTypes from './user.types'
import { auth, handUserProfile, GoogleProvider } from './../../firebase/utils'

export const setCurrentUser = (user) => ({
  type: userTypes.SET_CURRENT_USER,
  payload: user
})

export const resetAllAuthForms = () => ({
  type: userTypes.RESET_AUTH_FORMS
})

export const signInUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      await auth.signInWithEmailAndPassword(email, password)
      dispatch({
        type: userTypes.SIGN_IN_SUCCESS,
        payload: true
      })
    } catch (err) {
      console.log(err)
    }
  }

export const signUpUser =
  ({ displayName, email, password, confirmPassword }) =>
  async (dispatch) => {
    if (password !== confirmPassword) {
      const err = ['Las contraseñas no coinciden']
      dispatch({
        type: userTypes.SIGN_UP_ERROR,
        payload: err
      })
      return
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      )
      await handUserProfile(user, { displayName })
      dispatch({
        type: userTypes.SIGN_UP_SUCCESS,
        payload: true
      })
    } catch (err) {
      console.log(err)
    }
  }
export const resetPassword =
  ({ email }) =>
  async (dispatch) => {
    try {
      const config = {
        // Cambiar cuando se haga el deploy
        url: 'http://localhost:3000/login'
      }
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          dispatch({
            type: userTypes.RESET_PASSWORD_SUCCES,
            payload: true
          })
        })
        .catch(() => {
          const err = [
            'El correo no se encuentra registrado en Huellitas. Por favor intente de nuevo'
          ]
          dispatch({
            type: userTypes.RESET_PASSWORD_ERROR,
            payload: err
          })
        })
    } catch (err) {
      // console.log(err)
    }
  }
export const signInWhithGoogle = () => async (dispatch) => {
  try {
    await auth.signInWithPopup(GoogleProvider).then(() => {
      dispatch({
        type: userTypes.SIGN_IN_SUCCESS,
        payload: true
      })
    })
  } catch (error) {
    console.log(error)
  }
}
