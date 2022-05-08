import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signUpUserStart } from '../../redux/User/user.actions'
import { useHistory } from 'react-router-dom'
import './SingUp.css'
import FormInput from '../forms/formInput/FormInput'
import Button from '../forms/button/Button'

import AuthWrapper from '../authWrapper/AuthWrapper'
import { Container, Row, Col } from 'react-bootstrap'

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErr: user.userErr
})

const SingUp = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { currentUser, userErr } = useSelector(mapState)
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [errors, setErrors] = useState([])

  useEffect(() => {
    if (currentUser) {
      reset()
      history.push('/')
    }
  }, [currentUser])

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr)
    }
  }, [userErr])

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
      signUpUserStart({
        displayName,
        email,
        password,
        confirmPassword
      })
    )
  }

  return (
    <Container className='mt-5 signup '>
      <Row>
        <Col
          lg={12}
          className='d-flex flex-column align-items-center signup_container'
        >
          <h2 className='signup__title'>Registrate</h2>
          <form onSubmit={handleSubmit} className='signup__form'>
            <div className='w-100 pe-5 ps-5'>
              <FormInput
                styleclass='regInput'
                type='text'
                value={displayName}
                name='displayName'
                label='Ingrese su nombre completo'
                placeholder='Daniel'
                handleChange={(e) => setDisplayName(e.target.value)}
                role='name'
              ></FormInput>
              <FormInput
                styleclass='regInput'
                type='email'
                value={email}
                name='email'
                label='Ingrese su email'
                placeholder='Daniel@email.com'
                role='email'
                handleChange={(e) => setEmail(e.target.value)}
              ></FormInput>
              <FormInput
                styleclass='regInput'
                type='password'
                value={password}
                name='password'
                label='Ingrese su contraseña'
                role='password'
                placeholder='******'
                handleChange={(e) => setPassword(e.target.value)}
              ></FormInput>
              <FormInput
                styleclass='regInput'
                type='password'
                value={confirmPassword}
                name='confirmPassword'
                label='Confirme su contraseña'
                role='confirm'
                placeholder='******'
                handleChange={(e) => setconfirmPassword(e.target.value)}
              ></FormInput>
            </div>
            <Button role='submit' type='btnRegular'>
              Registrate
            </Button>
          </form>
        </Col>
      </Row>
    </Container>
    /*    <div className='signup__formContainer'>
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
          role='name'
        ></FormInput>
        <FormInput
          styleclass='regInput'
          type='email'
          value={email}
          name='email'
          label='Ingrese su email'
          placeholder='Daniel@email.com'
          role='email'
          handleChange={(e) => setEmail(e.target.value)}
        ></FormInput>
        <FormInput
          styleclass='regInput'
          type='password'
          value={password}
          name='password'
          label='Ingrese su contraseña'
          role='password'
          placeholder='******'
          handleChange={(e) => setPassword(e.target.value)}
        ></FormInput>
        <FormInput
          styleclass='regInput'
          type='password'
          value={confirmPassword}
          name='confirmPassword'
          label='Confirme su contraseña'
          role='confirm'
          placeholder='******'
          handleChange={(e) => setconfirmPassword(e.target.value)}
        ></FormInput>

        <Button role='submit' type='btnRegular'>
          Registrate
        </Button>
      </form>
    </div> */
  )
}

export default SingUp
