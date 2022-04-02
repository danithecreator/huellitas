import React, { Component } from 'react'
import './SingUp.css'
import FormInput from '../forms/formInput/FormInput'
import Button from '../forms/button/Button'
import { auth, handUserProfile } from './../../firebase/utils'
import AuthWrapper from '../authWrapper/AuthWrapper'
const initialState = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
  errors: ''
}

class SingUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...initialState
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }
  handleSubmit = async (event) => {
    event.preventDefault()
    const { displayName, email, password, confirmPassword } = this.state

    if (password !== confirmPassword) {
      const err = ['Las contraseñas no coinciden']
      this.setState({
        errors: err
      })
      return
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      )

      await handUserProfile(user, { displayName })

      this.setState({
        ...initialState
      })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { displayName, email, password, confirmPassword, errors } = this.state
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
          <form onSubmit={this.handleSubmit} className='signup__form'>
            <FormInput
              styleclass='regInput'
              type='text'
              value={displayName}
              name='displayName'
              label='Ingrese su nombre completo'
              placeholder='Daniel'
              handleChange={this.handleChange}
            ></FormInput>
            <FormInput
              styleclass='regInput'
              type='email'
              value={email}
              name='email'
              label='Ingrese su email'
              placeholder='Daniel@email.com'
              handleChange={this.handleChange}
            ></FormInput>
            <FormInput
              styleclass='regInput'
              type='password'
              value={password}
              name='password'
              label='Ingrese su contraseña'
              placeholder='******'
              handleChange={this.handleChange}
            ></FormInput>
            <FormInput
              styleclass='regInput'
              type='password'
              value={confirmPassword}
              name='confirmPassword'
              label='Confirme su contraseña'
              placeholder='******'
              handleChange={this.handleChange}
            ></FormInput>

            <Button type='btnRegular'>Registrate</Button>
          </form>
        </div>
      </AuthWrapper>
    )
  }
}

export default SingUp
