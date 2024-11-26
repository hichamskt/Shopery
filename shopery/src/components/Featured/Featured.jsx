import React from 'react'
import "../Featured/Featured.css"
import { FaShippingFast } from "react-icons/fa";
import { MdHeadsetMic } from "react-icons/md";
import { BsBagCheck } from "react-icons/bs";
import { FiBox } from "react-icons/fi";


function Featured() {
  return (
    <div className='container'>
        <div className='feastured'>
        <FeaturedBox title='Free Shipping' description="Free shipping on all your order"  ><FaShippingFast/></FeaturedBox>
        <FeaturedBox title='Customer Support 24/7' description="Instant access to Support"  ><MdHeadsetMic/></FeaturedBox>
        <FeaturedBox title='100% Secure Payment' description="We ensure your money is save"  ><BsBagCheck/></FeaturedBox>
        <FeaturedBox title='Money-Back Guarantee' description="30 Days Money-Back Guarantee"  ><FiBox/></FeaturedBox>
        </div>
    </div>
  )
}

export default Featured

function FeaturedBox({children ,title,description}){
    return(
        <div className='featureBox'>
            {children}
            <div><p>{title}</p>
                <p>{description}</p>
                </div>
        </div>
    )
}