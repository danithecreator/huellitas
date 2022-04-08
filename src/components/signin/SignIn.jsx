import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  signInUser,
  signInWhithGoogle,
  resetAllAuthForms
} from '../../redux/User/user.actions'
import './SignIn.css'
import { Link, withRouter } from 'react-router-dom'
import Pets from '../../assets/catanddog.jpg'
import Logo from '../../assets/logo.svg'
import GoogleIcon from '../../assets/googleIcon.svg'
import Button from '../forms/button/Button'
import FormInput from '../forms/formInput/FormInput'

import AuthWrapper from '../authWrapper/AuthWrapper'

const mapState = ({ user }) => ({
  signInSuccess: user.signInSuccess
})

const SignIn = (props) => {
  const { signInSuccess } = useSelector(mapState)
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (signInSuccess) {
      resetForm()
      dispatch(resetAllAuthForms())
      props.history.push('/')
    }
  }, [signInSuccess])

  const resetForm = () => {
    setEmail('')
    setPassword('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(signInUser({ email, password }))
  }
  const handleGoogleSignIn = () => {
    dispatch(signInWhithGoogle())
  }

  return (
    <AuthWrapper>
      <div className='signin__formContainer signin__element'>
        <h2 className='signin__title'>Inicia Sesión</h2>
        <img className='signin__logo' src={Logo} alt='' />
        <form className='signin__form' onSubmit={handleSubmit}>
          <FormInput
            styleclass='regInput'
            type='email'
            name='email'
            value={email}
            label='Ingrese su email'
            placeholder='tuemai@email.com'
            handleChange={(e) => setEmail(e.target.value)}
          ></FormInput>
          <FormInput
            styleclass='regInput'
            type='password'
            name='password'
            value={password}
            label='Ingrese su contraseña'
            placeholder='******'
            handleChange={(e) => setPassword(e.target.value)}
          ></FormInput>
          <div className='signin__links'>
            <Link to='/recovery'>¿Has olvidado la contraseña?</Link>
          </div>

          <Button type='btnRegular'>Ingresar</Button>

          <p>Ó inicia sesión con</p>
          <Button type='btnGoogle' onClick={handleGoogleSignIn}>
            <div className='signin__googleButtonIcon'>
              <img alt='Google sign-in' src={GoogleIcon} />
            </div>
            <div>
              <p>Continuar con Google</p>
            </div>
          </Button>
        </form>
      </div>
      <div className='signin__image signin__element'>
        <img src={Pets} alt='imagen del formulario' />
      </div>
    </AuthWrapper>
  )
}

export default withRouter(SignIn)
