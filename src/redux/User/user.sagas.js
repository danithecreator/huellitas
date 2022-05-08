import { takeLatest, call, all, put } from 'redux-saga/effects'
import {
  auth,
  handUserProfile,
  getCurrentUser,
  GoogleProvider
} from './../../firebase/utils'
import userTypes from './user.types'
import {
  sigInSuccess,
  signOutUserSuccess,
  resetPasswordSuccess,
  userError,
  userSignInError
} from './user.actions'
import { handleResetPasswordAPI } from './user.helpers'

export function* getSnapshotFromUserAuth(user, additionalData = {}) {
  try {
    const userRef = yield call(handUserProfile, {
      userAuth: user,
      additionalData
    })
    const snapshot = yield userRef.get()

    yield put(
      sigInSuccess({
        id: snapshot.id,
        ...snapshot.data()
      })
    )
  } catch (err) {
    //  console.log(err);
  }
}

export function* emailSignIn({ payload: { email, password } }) {
  const errors = []
  if (email.length <= 0 || email.trim() === '') {
    errors.push('Ingrese su email')
  }
  if (password.length <= 0) {
    errors.push('Ingrese su contraseña')
  }
  if (errors.length > 0) {
    yield put(userSignInError(errors))
    return
  }
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password)
    yield getSnapshotFromUserAuth(user)
  } catch (err) {
    console.log(err)
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn)
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser()
    if (!userAuth) return
    yield getSnapshotFromUserAuth(userAuth)
  } catch (err) {
    //  console.log(err);
  }
}

export function* onCheckUserSession() {
  yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signOutUser() {
  try {
    yield auth.signOut()
    yield put(signOutUserSuccess())
  } catch (err) {
    //console.log(err);
  }
}

export function* onSignOutUserStart() {
  yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser)
}

export function* signUpUser({
  payload: { displayName, email, password, confirmPassword }
}) {
  const errors = []

  if (displayName.length <= 0 || displayName.trim() === '') {
    errors.push('Ingrese su nombre')
  }
  if (email.length <= 0) {
    errors.push('Ingrese un correo valido')
  }

  if (password.length < 8 || password.trim() === '') {
    errors.push('Ingrese una contraseña mayor a 8 carateres')
  }

  if (password !== confirmPassword) {
    errors.push('Las contraseñas no coinciden')
  }
  if (errors.length > 0) {
    yield put(userError(errors))
    return
  }

  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password)
    const additionalData = { displayName }
    yield getSnapshotFromUserAuth(user, additionalData)
  } catch (err) {
    if (err.code === 'auth/email-already-in-use') {
      errors.push('El email ya esta en uso')
      yield put(userError(errors))
    }
  }
}

export function* onSignUpUserStart() {
  yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser)
}

export function* resetPassword({ payload: { email } }) {
  try {
    yield call(handleResetPasswordAPI, email)
    yield put(resetPasswordSuccess())
  } catch (err) {
    yield put(userError(err))
  }
}

export function* onResetPasswordStart() {
  yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword)
}

export function* googleSignIn() {
  try {
    const { user } = yield auth.signInWithPopup(GoogleProvider)
    yield getSnapshotFromUserAuth(user)
  } catch (error) {
    console.log(error)
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignIn)
}

export default function* userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutUserStart),
    call(onSignUpUserStart),
    call(onResetPasswordStart),
    call(onGoogleSignInStart)
  ])
}
