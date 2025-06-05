import React from 'react'
import '../styles/ErrorPage.css'
import HeaderWhite from '../components/Header/HeaderWhite'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import GreenButton from '../UI/GreenButton/GreenButton'
import errorimag from "../assets/error.png"
import Footer from '../components/Footer/Footer'
import { useNavigate } from "react-router-dom";

function ErrorPage() {

const navigate = useNavigate();

  const handleNav = () => {
    navigate("/"); 
  };

  return (
    <div>
        <HeaderWhite />
        <Breadcrumbs location={["404 Error Page"]} />
        <div  className='container'>
        <div className='errorbody'>
            <div>
                <img src={errorimag} alt="errorimage" />
            </div>
            <p>Oops! page not found</p>
            <p>It seems the page you’re looking for doesn’t exist. Don’t worry, let’s get you back on track!</p>
            <div>
                <GreenButton text={"Back to Home"} handleClick={handleNav}/>
            </div>
        </div>
        </div>
        <Footer />
        
    </div>
  )
}

export default ErrorPage

