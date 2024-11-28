import React, { useEffect, useState } from "react";
import "../Header/Header.css";
import { FiMapPin } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { BiBasket } from "react-icons/bi";
import { FiPhone } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";


import logo from "../../assets/Logo.png"
import { useCurrencyContex } from "../../contexts/CurrencyContex";
import { useTranslation } from "react-i18next";

function HeaderWhite() {
  const { t, i18n } = useTranslation();
  

  return (
    <div className="header">
        <div style={{backgroundColor:'black',
                color:'white'
        }}>
        <div className="container">
            <HeaderTopSide t={t} i18n={i18n} />
        </div>
        </div>
        <hr></hr>
        <div className="container">
            <HeaderMidPart t={t}/>
        </div>
        <div 
        style={{
            backgroundColor: "white", 
            borderTop: "0.3px solid #E6E6E6",
            borderBottom: "0.3px solid #E6E6E6"
          }}
        >
          <div className="container">
            <HeaderBottomPart />
          </div>
        </div>
    </div>
  );
}

export default HeaderWhite;

function HeaderTopSide({t,i18n}) {
  const [selectedCurrency, setSelectedCurrency] = useState(
    localStorage.getItem("currency") || "MAD"
  );
  const [exchangeRates, setExchangeRates] = useState({});
  const [langue, setLangue] = useState(localStorage.getItem('i18nextLng') || 'eng');
  const { setcurrency, setRate } = useCurrencyContex();
  
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        const data = await response.json();
        setExchangeRates(data.rates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, []);
  
  const hundleSelectedCurrency = (e) => {
    setcurrency(e.target.value);
    setSelectedCurrency(e.target.value);
    const rate = exchangeRates[e.target.value] || 1;
    setRate(rate);
    localStorage.setItem("rate", rate);
    localStorage.setItem("currency", e.target.value);
  };
  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
    setLangue(e.target.value)
  };

  return (
    <div className="headertopside">
      <span className="locationside" style={{color:"white"}}>
        <FiMapPin />
        <p>{t('storelocation')}</p>
      </span>
      <div className="headertoprigthside">
        <div className="inputs">
          <select
            name="currency"
            className="opt"
            id="currency"
               value={langue}
              onChange={(e) => changeLanguage(e)}
              style={{color:'white'
                ,backgroundColor:'black'
              }}
          >
            <option value="en"> Eng</option>
            <option value="fr"> Fr</option>
            <option value="ar">ar</option>
          </select>

          <select
            name="currency"
            className="opt"
            id="currency"
              value={selectedCurrency}
              onChange={(e) => hundleSelectedCurrency(e)}
              style={{color:'white'
                ,backgroundColor:'black'
              }}
          >
            <option value="USD"> USD</option>
            <option value="MAD"> MAD</option>
            <option value="CAD"> CAD</option>
            <option value="CNY"> CNY</option>
          </select>
        </div>
        <NavLink to="/login">
        <p style={{color:"white"}}>{t('loginregidter')}</p>
        </NavLink>
      </div>
    </div>
  );
}


function HeaderMidPart({t}){


  return(
    <div className="headerMidPart">
      <img src={logo} alt="logo" className="logo"/>
      <div className="headersearchinput">
      <IoIosSearch/>
      <input type="text" placeholder={t('Search')}/>
      <button>{t('Search')}</button>
      </div>
      <div className="headermifrigth">
      <CiHeart />
      <div className="headershoppingside">
      <BiBasket/>
      <div className="headershoping-text">
        <p>{t('shopingcard')}</p>
        <p>$57.00</p>
      </div>
      </div>
      </div>
    </div>
  )
}

function HeaderBottomPart(){


  return(
    <div className="headerbottompart" style={{color:"black"}}>
      <ul style={{color:"black"}}>
        <li>
          <NavLink to="/">
          Home </NavLink></li>
        <li><NavLink to="/shop">Shop</NavLink></li>
        <li><NavLink to="/blogs" >Blogs</NavLink></li>
        <li><NavLink to="/about">About Us</NavLink></li>
        <li><NavLink to="/faqs">FaQs</NavLink></li>
        <li><NavLink to="contactus">Contact Us</NavLink></li>
      </ul>
      <div className="hb-rightside">
      <span className="headerphone">

      <FiPhone/>
      <p>(219) 555-0114</p>
        </span>
      <FaRegUser/>
      </div>
    </div>
  )
}