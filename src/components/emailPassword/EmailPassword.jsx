import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {  resetPasswordStart, resetUserState } from '../../redux/User/user.actions'
import './EmailPassword.css'
import AuthWrapper from '../authWrapper/AuthWrapper'
import FormInput from '../forms/formInput/FormInput'
import Button from '../forms/button/Button'

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  userErr: user.userErr
})

const EmailPassword = (_props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { resetPasswordSuccess, userErr } = useSelector(mapState)
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState([])

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetUserState());
      history.push('/login');
    }
  }, [resetPasswordSuccess]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr);
    }
  }, [userErr])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(resetPasswordStart({ email }));
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

export default EmailPassword;
