import React, { useState } from 'react'
import './EmailPassword.css'
import { withRouter } from 'react-router-dom'
import AuthWrapper from '../authWrapper/AuthWrapper'
import FormInput from '../forms/formInput/FormInput'
import Button from '../forms/button/Button'

import { auth } from './../../firebase/utils'

const EmailPassword = props => {

  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);



 const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const config = {
        // Cambiar cuando se haga el deploy
        url: 'http://localhost:3000/login'
      }
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          props.history.push('/login')
          console.log('Password reset')
        })
        .catch(() => {
          const err = [
            'El correo no se encuentra registrado en Huellitas. Por favor intente de nuevo'
          ]
         setErrors(err);
          console.log(Wrong)
        })
    } catch (err) {
      // console.log(err)
    }
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
              handleChange={e => setEmail(e.target.value)}
            ></FormInput>
            <Button type='btnRegular'>Email Password</Button>
          </form>
        </div>
      </AuthWrapper>
    )
}

export default withRouter(EmailPassword)
