import React from 'react'
import '../DiscountBannar/DiscountBannar.css'
import { FaArrowRightLong } from 'react-icons/fa6'


function DiscountBannar() {
  return (
    <div className='container'>
       <div className='DiscountBannar'>
        <div className='dicounttext'>
            <p>Summer Sale</p>
            <p><span>37% </span>OFF</p>
            <p>Free on all your order, Free Shipping and  30 days money-back guarantee</p>
            <button className='DiscountBannarbtn'>Shop Now <FaArrowRightLong/> </button>
        </div>
       </div>
        
        </div>
  )
}

export default DiscountBannar