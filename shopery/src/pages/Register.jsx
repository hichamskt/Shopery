import React, { useState } from 'react'
import "../styles/Register.css"
import HeaderWhite from '../components/Header/HeaderWhite'
import { NavLink } from 'react-router-dom'
import GreenButton from '../UI/GreenButton/GreenButton'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import Footer from '../components/Footer/Footer'
import Registerinput from '../UI/Registerinput/Registerinput'
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

  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;


  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
  
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: passwordPattern,
      required: true,
    },
    {
      id: 3,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];




  const handleSubmit = () => {
   

    const newErrors = {};

   
    if (!values.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    
    if (!values.password) {
      newErrors.password = "Password is required.";
    } else if (!passwordPattern.test(values.password)) {
      newErrors.password = inputs[1].errorMessage;
    }

   
    if (values.confirmPassword !== values.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    
    if (!values.termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms & conditions.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Account created successfully!");
    }
  };


  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({ ...values, [name]: type === "checkbox" ? checked : value });
  



    if (errors[name]) {
      const updatedErrors = { ...errors }; 
      delete updatedErrors[name];         
      setErrors(updatedErrors);           
    }

  };
  
console.log(errors)

  return (
    <div className='container'>

    <div className='loginform' >
      <p className='sing'>Create Account</p>
      {
        inputs.map((input,i)=>(
          <Registerinput key={input.id} 
          {...input}
          value={values[input.name]}
          onChange={onChange}
          err = {errors[input.name]}
           />
        ))
      }
      <div className='remember'>
      <label>
        <input
          type="checkbox"
          name="termsAccepted"
          checked={values.termsAccepted}
          onChange={onChange}
        />
        Accept all terms & Conditions
      </label>
     
      </div>
      <div className='register-errs'>
      { 
         Object.keys(errors).map((key, i) => (
          <p key={i}>{errors[key]}</p>
        ))
      }
      </div>
      <GreenButton text={"Create Account"} handleClick={handleSubmit} />
      <p className='noaccount'>Already have account 
       <NavLink to="/login">  Login</NavLink> </p>

    </div>
          </div>
  )
}