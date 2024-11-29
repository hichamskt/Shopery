import React from 'react'
import '../styles/Login.css'
import HeaderWhite from '../components/Header/HeaderWhite'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import GreenButton from '../UI/GreenButton/GreenButton'
import { NavLink } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
function Login() {
  return (
    <div>
        <HeaderWhite />
        <Breadcrumbs location={["Account","Login"]} />
        <LoginForm />
        <Footer />
    </div>
  )
}

export default Login


function LoginForm(){


  return(
    <div className='container'>

    <div className='loginform' >
      <p className='sing'>Sign In</p>
      <input type='email' placeholder='Email' />
      <input type='password' placeholder='Password' />
      <div className='remember'>
      <label>
        <input
          type="checkbox"
          
        />
        Remember me
      </label>
        <p>Forget Password</p>
      </div>
      <GreenButton text={"Login"} />
      <p className='noaccount'>Don’t have account? 
       <NavLink to="/register"> Register</NavLink> </p>
    </div>
          </div>
  )
}