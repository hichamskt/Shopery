import React, { useState } from 'react'
import '../styles/Login.css'
import HeaderWhite from '../components/Header/HeaderWhite'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import GreenButton from '../UI/GreenButton/GreenButton'
import { NavLink } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import Registerinput from '../UI/Registerinput/Registerinput'
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


  const [isSubmitting, setIsSubmitting] = useState(false);  

  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  


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
        "Enter A Password!",
      label: "Password",
      required: true,
    },
  ]


  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({ ...values, [name]: value });

    if (errors[name]) {
     
      const updatedErrors = { ...errors }; 
      
      delete updatedErrors[name];         
      setErrors(updatedErrors);           
    }
    
  };


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
      }
  
     
  
      setErrors(newErrors);
  
      // if (Object.keys(newErrors).length === 0) {
        
      //   setIsSubmitting(true);
  
        
      //   try {
      //     const response = await axiosInstance.post("/user/register", values); 
          
      //   } catch (err) {
         
      //     if (err.response?.status === 409) {
      //       const newErrors = {};
      //       newErrors.email = err.response.data.message;
            
      //       setErrors(newErrors);
      //     } else {
      //       console.error("An unexpected error occurred:", err.message);
      //     }
  
  
      //     console.error(err.response?.data || err.message); 
      //   }finally {
      //     setIsSubmitting(false);  
      //     navigat('/login')
      //   }
      // }
    };
  




  return(
    <div className='container'>

    <div className='loginform' >
      <p className='sing'>Sign In</p>
      {/* <input type='email' placeholder='Email' />
      <input type='password' placeholder='Password' /> */}

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
          
        />
        Remember me
      </label>
        <p>Forget Password</p>
      </div>
      <GreenButton text={"Login"} handleClick={handleSubmit} />
      <p className='noaccount'>Don’t have account? 
       <NavLink to="/register"> Register</NavLink> </p>
    </div>
          </div>
  )
}