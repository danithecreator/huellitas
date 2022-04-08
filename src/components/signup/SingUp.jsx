import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signUpUser, resetAllAuthForms } from '../../redux/User/user.actions'
import { withRouter } from 'react-router-dom'
import './SingUp.css'
import FormInput from '../forms/formInput/FormInput'
import Button from '../forms/button/Button'

import AuthWrapper from '../authWrapper/AuthWrapper'

const mapState = ({ user }) => ({
  signUpSuccess: user.signUpSuccess,
  signUpError: user.signUpError
})

const SingUp = (props) => {
  const { signUpSuccess, signUpError } = useSelector(mapState)
  const dispatch = useDispatch()
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [errors, setErrors] = useState([])

  useEffect(() => {
    if (signUpSuccess) {
      reset()
      dispatch(resetAllAuthForms())
      props.history.push('/')
    }
  }, [signUpSuccess])

  useEffect(() => {
    console.log('hello1')
    if (Array.isArray(signUpError) && signUpError.length > 0) {
      setErrors(signUpError)
      console.log('hello2')
    }
  }, [signUpError])

  const reset = () => {
    setDisplayName('')
    setEmail('')
    setPassword('')
    setconfirmPassword('')
    setErrors([])
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(
      signUpUser({
        displayName,
        email,
        password,
        confirmPassword
      })
    )
  }

  return (
    <AuthWrapper size='authWrapper__reg'>
      <div className='signup__formContainer'>
        <h2 className='signup__title'>Registrate</h2>
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
        <form onSubmit={handleSubmit} className='signup__form'>
          <FormInput
            styleclass='regInput'
            type='text'
            value={displayName}
            name='displayName'
            label='Ingrese su nombre completo'
            placeholder='Daniel'
            handleChange={(e) => setDisplayName(e.target.value)}
          ></FormInput>
          <FormInput
            styleclass='regInput'
            type='email'
            value={email}
            name='email'
            label='Ingrese su email'
            placeholder='Daniel@email.com'
            handleChange={(e) => setEmail(e.target.value)}
          ></FormInput>
          <FormInput
            styleclass='regInput'
            type='password'
            value={password}
            name='password'
            label='Ingrese su contraseña'
            placeholder='******'
            handleChange={(e) => setPassword(e.target.value)}
          ></FormInput>
          <FormInput
            styleclass='regInput'
            type='password'
            value={confirmPassword}
            name='confirmPassword'
            label='Confirme su contraseña'
            placeholder='******'
            handleChange={(e) => setconfirmPassword(e.target.value)}
          ></FormInput>

          <Button type='btnRegular'>Registrate</Button>
        </form>
      </div>
    </AuthWrapper>
  )
}

export default withRouter(SingUp)
