import React from 'react'
import "../SubscribePopup/SubscribePopup.css"
import popup from "../../assets/popupimg.png"
import { RxCross2 } from "react-icons/rx";


function SubscribePopup() {
  return (
    <div className='popupsubscribe'>
        <div className='popupcontainer'>
        <img src={popup} alt='popupimg' />
        <div className='popuptext'>
            <RxCross2 />
            <p>Subcribe to Our Newsletter</p>
            <p>Subscribe to our newlletter and Save your <span>20% money</span>  with discount code today.</p>
            <div className='popupinput'> 
                <input type='email' placeholder='Enter your email' />
                <button>Subscribe</button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default SubscribePopup