import React from 'react'
import "../styles/Register.css"
import HeaderWhite from '../components/Header/HeaderWhite'
import { NavLink } from 'react-router-dom'
import GreenButton from '../UI/GreenButton/GreenButton'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import Footer from '../components/Footer/Footer'
function Register() {
  return (
    <div>
      <HeaderWhite />
      <Breadcrumbs location={['Account','Create Account']} />
      <RegisterForm />
      <Footer />
    </div>
  )
}

export default Register


function RegisterForm(){



  return (
    <div className='container'>

    <div className='loginform' >
      <p className='sing'>Create Account</p>
      <input type='email' placeholder='Email' />
      <input type='password' placeholder='Password' />
      <input type='password' placeholder='Password' />
      <div className='remember'>
      <label>
        <input
          type="checkbox"
          
        />
        Accept all terms & Conditions
      </label>
        
      </div>
      <GreenButton text={"Create Account"} />
      <p className='noaccount'>Already have account 
       <NavLink to="/login">  Login</NavLink> </p>
    </div>
          </div>
  )
}