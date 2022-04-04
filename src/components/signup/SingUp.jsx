import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import './SingUp.css'
import FormInput from '../forms/formInput/FormInput'
import Button from '../forms/button/Button'
import { auth, handUserProfile } from './../../firebase/utils'
import AuthWrapper from '../authWrapper/AuthWrapper'

const SingUp = props => {

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const reset = () => {
    setDisplayName('');
    setEmail('');
    setPassword('');
    setconfirmPassword('');
    setErrors([]);
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    if (password !== confirmPassword) {
      const err = ['Las contraseñas no coinciden']
      setErrors(err);
      return
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      )

      await handUserProfile(user, { displayName })

      reset();
      props.history.push('/');

    } catch (err) {
      console.log(err)
    }
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
              handleChange={e => setDisplayName(e.target.value)}
            ></FormInput>
            <FormInput
              styleclass='regInput'
              type='email'
              value={email}
              name='email'
              label='Ingrese su email'
              placeholder='Daniel@email.com'
              handleChange={e => setEmail(e.target.value)}
            ></FormInput>
            <FormInput
              styleclass='regInput'
              type='password'
              value={password}
              name='password'
              label='Ingrese su contraseña'
              placeholder='******'
              handleChange={e => setPassword(e.target.value)}
            ></FormInput>
            <FormInput
              styleclass='regInput'
              type='password'
              value={confirmPassword}
              name='confirmPassword'
              label='Confirme su contraseña'
              placeholder='******'
              handleChange={e => setconfirmPassword(e.target.value)}
            ></FormInput>

            <Button type='btnRegular'>Registrate</Button>
          </form>
        </div>
      </AuthWrapper>
    )
}

export default withRouter(SingUp);
