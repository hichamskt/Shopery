import React, { useState } from 'react'
import "../styles/faqs.css"
import HeaderWhite from '../components/Header/HeaderWhite'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import farmer from "../assets/farmer.png";
import Footer from '../components/Footer/Footer'

import { HiPlus } from "react-icons/hi";
import ShoppingCardPopup from '../components/ShoppingCardPopup/ShoppingCardPopup';
import { useCardContext } from '../contexts/CardContext';

function Faqs() {
    const { showCard } = useCardContext();

    
  return (
    <div>
        { showCard && <div className="shoping-ovlay" style={{
        opacity:showCard? 1 : "",
        zIndex:showCard?10:""
      }}></div>}
       <ShoppingCardPopup />
       
        <HeaderWhite />
        <Breadcrumbs location={["FaQs"]} />
        <div className='container'>
        <div className='faqcontainer'>
        <FaQsCareds />
            <img src={farmer} alt='farmer'  className='faqimgbox'   />
        </div>
        </div>
        <Footer />
    </div>
  )
}

export default Faqs



const faqsdata=[
    {
        title:"What is Ecobazar?",
        discription:"Ecobazar is your trusted destination for organic, eco-friendly products that prioritize your health and the planet. We source only the best from sustainable farms to ensure quality and freshness in every item."
    },
    {
        title:"Why Choose Organic?",
        discription:'Organic products are free from harmful chemicals, pesticides, and artificial additives. By choosing organic, you support your health, the environment, and sustainable farming practices.'
    },
    {
        title:"What Products Does Ecobazar Offer?",
        discription:"Ecobazar offers a wide range of organic products, including fresh produce, pantry essentials, beverages, and more. All our items are carefully curated to meet the highest standards of organic certification."
    },
    {
        title:"How Does Delivery Work?",
        discription:"We ensure fast and reliable delivery right to your doorstep. After placing your order, you’ll receive updates about your delivery status, so you always know when to expect your organic goodies."
    },
    {
        title:"How Do I Contact Customer Support?",
        discription:"Our friendly support team is here to help! You can reach us through email, live chat, or by filling out the contact form on our website. We’re always happy to assist you with any questions or concerns."
    },
]

function FaQsCareds (){

    return <div className='faqscards'>
        <p className='faqsheading'>Welcome, Let’s Talk About Our Ecobazar</p>
        <div className='cardsbox'>
             {faqsdata.map((faq,index)=>(
            <FaQCard key={index} faq={faq} />
        ))}
        </div>
    </div>
}

function FaQCard({faq}){
    const [isActive,setIsActive]=useState(false);

    return(
        <div>
            <div className='faqs-top' style={{
                backgroundColor:isActive?"white":"",
                border:isActive?"1px solid #00b207": "",
                borderBottomLeftRadius:isActive?"0px" :"",
                borderBottomRightRadius:isActive?"0px" :"",
            }}>
            <p style={{color:isActive?'#00b207':"",} }>{faq.title}</p>
            <span onClick={()=>setIsActive(!isActive)} style={{backgroundColor:isActive?'#F2F2F2':"",}}>
            <HiPlus  />

            </span>
            </div>
           {isActive && <div className='faqdec-box'>
                <p>{faq.discription}</p>
            </div>}
        </div>
    )
}