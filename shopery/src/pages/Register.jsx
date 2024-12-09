import React, { useEffect, useState } from 'react'
import "../styles/Register.css"
import HeaderWhite from '../components/Header/HeaderWhite'
import { NavLink, useNavigate } from 'react-router-dom'
import GreenButton from '../UI/GreenButton/GreenButton'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import Footer from '../components/Footer/Footer'
import Registerinput from '../UI/Registerinput/Registerinput'
import axiosInstance from '../axios/axiosInstance'
import DotsLoader from '../UI/DotsLoader/DotsLoader'
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
  const [isSubmitting, setIsSubmitting] = useState(false);  

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
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
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



  const navigat = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

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
      
      setIsSubmitting(true);

      
      try {
        const response = await axiosInstance.post("/user/register", values); 
        if(response.status=== 201) navigat('/login')
      } catch (err) {
       
        if (err.response?.status === 409) {
          const newErrors = {};
          newErrors.email = err.response.data.message;
          
          setErrors(newErrors);
        } else {
          console.error("An unexpected error occurred:", err.message);
        }


        console.error(err.response?.data || err.message); 
      }finally {
        setIsSubmitting(false);  
      }
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
      <label  style={{
        color:errors.termsAccepted? 'red': '',
      }}>
        <input
          type="checkbox"
          name="termsAccepted"
          checked={values.termsAccepted}
          onChange={onChange}
        />
        Accept all terms & Conditions
      </label>
     
      </div>
      
      {isSubmitting ? <div style={{
        display:'flex',
        alignItems:'center',
        justifyContent:"center",
        padding:'1rem'
      }} ><DotsLoader /></div> : <GreenButton text={"Create Account"} handleClick={handleSubmit} />}
      <p className='noaccount'>Already have account 
       <NavLink to="/login">  Login</NavLink> </p>

    </div>
          </div>
  )
}