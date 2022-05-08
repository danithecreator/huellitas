import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  emailSignInStart,
  googleSignInStart
} from '../../redux/User/user.actions'
import './SignIn.css'
import { Link, useHistory } from 'react-router-dom'
import Pets from '../../assets/catanddog.jpg'
import Logo from '../../assets/logo.svg'
import GoogleIcon from '../../assets/googleIcon.svg'
import Button from '../forms/button/Button'
import FormInput from '../forms/formInput/FormInput'

import AuthWrapper from '../authWrapper/AuthWrapper'
import { Alert, Col, Container, Row } from 'react-bootstrap'

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userSignInError: user.userSignInError
})

const SignIn = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { currentUser, userSignInError } = useSelector(mapState)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])

  useEffect(() => {
    if (currentUser) {
      resetForm()
      history.push('/')
    }
  }, [currentUser])

  useEffect(() => {
    if (Array.isArray(userSignInError) && userSignInError.length > 0) {
      setErrors(userSignInError)
    }
  }, [userSignInError])

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setErrors([])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(emailSignInStart({ email, password }))
  }
  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart())
  }

  return (
    <Container className=' mt-5 signin'>
      <Row>
        <Col
          lg={6}
          className='d-flex flex-column align-items-center signin_container'
        >
          <h2 className='signin__title'>Inicia Sesion</h2>
          <img className='signin__logo' src={Logo} alt='' />
          <div className='w-75'>
            {errors.length > 0 && (
              <ul>
                {errors.map((err, index) => {
                  return (
                    <Alert key={index} variant='danger'>
                      {err}
                    </Alert>
                  )
                })}
              </ul>
            )}
          </div>

          <form className='signin__form w-100 m' onSubmit={handleSubmit}>
            <div className='w-100 pe-5 ps-5'>
              <FormInput
                type='email'
                name='email'
                value={email}
                label='Ingrese su email'
                placeholder='tuemai@email.com'
                handleChange={(e) => setEmail(e.target.value)}
                role='email'
              ></FormInput>
              <FormInput
                type='password'
                name='password'
                value={password}
                label='Ingrese su contraseña'
                placeholder='******'
                handleChange={(e) => setPassword(e.target.value)}
                role='password'
              ></FormInput>
            </div>

            <div className='signin__links'>
              <Link to='/recovery'>¿Has olvidado la contraseña?</Link>
            </div>
            <Button id='signInButton' type='btnRegular'>
              Ingresar
            </Button>
          </form>
          <p className='mb-3'>Ó inicia sesión con</p>
          <Button type='btnGoogle' onClick={handleGoogleSignIn}>
            <div className='signin__googleButtonIcon'>
              <img alt='Google sign-in' src={GoogleIcon} />
            </div>
            <div>
              <p>Continuar con Google</p>
            </div>
          </Button>
        </Col>
        <Col
          lg={6}
          className='signin__image signin__element d-none d-lg-block p-0'
        >
          <img src={Pets} alt='imagen del formulario' role='sideImg' />
        </Col>
      </Row>
    </Container>
  )
  {
    /* <div className='signin__formContainer signin__element'>
        <h2 className='signin__title'>Inicia Sesion</h2>
        <img className='signin__logo' src={Logo} alt='' />
        {errors.length > 0 && (
          <ul>
            {errors.map((err, index) => {
              return (
                <li
                  className='
                  signup__error'
                  key={index}
                >
                  {err}
                </li>
              )
            })}
          </ul>
        )}
        <form className='signin__form' onSubmit={handleSubmit}>
          <FormInput
            styleclass='regInput'
            type='email'
            name='email'
            value={email}
            label='Ingrese su email'
            placeholder='tuemai@email.com'
            handleChange={(e) => setEmail(e.target.value)}
            role='email'
          ></FormInput>
          <FormInput
            styleclass='regInput'
            type='password'
            name='password'
            value={password}
            label='Ingrese su contraseña'
            placeholder='******'
            handleChange={(e) => setPassword(e.target.value)}
            role='password'
          ></FormInput>
          <div className='signin__links'>
            <Link to='/recovery'>¿Has olvidado la contraseña?</Link>
          </div>

          <Button id='signInButton' type='btnRegular'>
            Ingresar
          </Button>
        </form>
        <p>Ó inicia sesión con</p>
        <Button type='btnGoogle' onClick={handleGoogleSignIn}>
          <div className='signin__googleButtonIcon'>
            <img alt='Google sign-in' src={GoogleIcon} />
          </div>
          <div>
            <p>Continuar con Google</p>
          </div>
        </Button>
      </div>
      <div className='signin__image signin__element'>
        <img src={Pets} alt='imagen del formulario' role='sideImg' />
      </div> */
  }
}

export default SignIn
