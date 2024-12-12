import React, { useState } from 'react'
import '../styles/Login.css'
import HeaderWhite from '../components/Header/HeaderWhite'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import GreenButton from '../UI/GreenButton/GreenButton'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import Registerinput from '../UI/Registerinput/Registerinput'
import axiosInstance from '../axios/axiosInstance'
import useAuth from '../hooks/useAuth'
import DotsLoader from '../UI/DotsLoader/DotsLoader'



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

  const LOGIN_URL = '/user/login';
  const [isSubmitting, setIsSubmitting] = useState(false);  

  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const   navigate = useNavigate();
  const {setAuth} = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";


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
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    if (errors[name]) {
     
      const updatedErrors = { ...errors }; 
      
      delete updatedErrors[name];         
      setErrors(updatedErrors);           
    }
    
  };


  const handleSubmit = async () => {
    
  
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
  
      if (Object.keys(newErrors).length === 0) {
        
        setIsSubmitting(true);
        try {
          const response = await axiosInstance.post(LOGIN_URL, values); 
          if(response.status=== 200){
            const accessToken = response?.data?.accessToken;
            
            const email = values.email; 
            setAuth({email,  accessToken });
            setValues({});
           console.log(accessToken);
            setTimeout(()=>{
              setIsSubmitting(false);
              navigate(from, { replace: true });
            },2000) 

          }
          
        } catch (err) {
         
          if (err.response?.status === 400) {
            const newErrors = {};
            newErrors.email = err.response.data.message;
            setIsSubmitting(false);
            setErrors(newErrors);
          } else {
            console.error("An unexpected error occurred:", err.message);
            setIsSubmitting(false);
          }
          console.error(err.response?.data || err.message); 
          setIsSubmitting(false);
        }
        }
      
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
      {isSubmitting?
      <div style={{
        display:'flex',
        alignItems:'center',
        justifyContent:"center",
        padding:'1rem'
      }} ><DotsLoader /></div>:
      <GreenButton text={"Login"} handleClick={handleSubmit} />}
      <p className='noaccount'>Don’t have account? 
       <NavLink to="/register"> Register</NavLink> </p>
    </div>
          </div>
  )
}