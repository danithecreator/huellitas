import React, { useState } from 'react';
import './SignIn.css'
import { Link, withRouter } from 'react-router-dom'
import Pets from '../../assets/catanddog.jpg'
import Logo from '../../assets/logo.svg'
import GoogleIcon from '../../assets/googleIcon.svg'
import Button from '../forms/button/Button'
import FormInput from '../forms/formInput/FormInput'
import { signInWhithGoogle, auth } from '../../firebase/utils'
import AuthWrapper from '../authWrapper/AuthWrapper'


const SignIn = props => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      resetForm();
      props.history.push('/');
      
    } catch (err) {
      console.log(err)
    }
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
              handleChange={e => setEmail(e.target.value)}
            ></FormInput>
            <FormInput
              styleclass='regInput'
              type='password'
              name='password'
              value={password}
              label='Ingrese su contraseña'
              placeholder='******'
              handleChange={e => setPassword(e.target.value)}
            ></FormInput>
            <div className='signin__links'>
              <Link to='/recovery'>¿Has olvidado la contraseña?</Link>
            </div>

            <Button type='btnRegular'>Ingresar</Button>

            <p>Ó inicia sesión con</p>
            <Button type='btnGoogle' onClick={signInWhithGoogle}>
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

export default withRouter(SignIn);
