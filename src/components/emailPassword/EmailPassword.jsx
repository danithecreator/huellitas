import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword, resetAllAuthForms } from '../../redux/User/user.actions'
import './EmailPassword.css'
import { withRouter } from 'react-router-dom'
import AuthWrapper from '../authWrapper/AuthWrapper'
import FormInput from '../forms/formInput/FormInput'
import Button from '../forms/button/Button'

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  resetPasswordError: user.resetPasswordError
})

const EmailPassword = (props) => {
  const { resetPasswordSuccess, resetPasswordError } = useSelector(mapState)
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState([])

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetAllAuthForms())
      props.history.push('/login')
    }
  }, [resetPasswordSuccess])

  useEffect(() => {
    if (Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
      setErrors(resetPasswordError)
    }
  }, [resetPasswordError])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(resetPassword({ email }))
  }

  return (
    <AuthWrapper size='authWrapper__reg'>
      <div className='emailPass_formContainer'>
        <h2 className='emailPass__title'>Ayuda de contraseña</h2>
        <p className='emailPass__exp'>
          Introduzca la dirección de correo electrónico asociado con su cuenta
          de Huellitas.
        </p>

        {errors.length > 0 && (
          <ul>
            {errors.map((err, index) => {
              return (
                <li className='emailPass__err' key={index}>
                  {err}
                </li>
              )
            })}
          </ul>
        )}

        <form className='emailPass__form' onSubmit={handleSubmit}>
          <FormInput
            styleclass='regInput'
            type='email'
            name='email'
            value={email}
            label='Ingrese su email'
            placeholder='tuemai@email.com'
            handleChange={(e) => setEmail(e.target.value)}
          ></FormInput>
          <Button type='btnRegular'>Email Password</Button>
        </form>
      </div>
    </AuthWrapper>
  )
}

export default withRouter(EmailPassword)
