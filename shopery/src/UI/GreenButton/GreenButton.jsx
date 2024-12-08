import React from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'
import '../GreenButton/GreenButton.css'
function GreenButton({text,handleClick}) {
 
    return (
        <button className='greenbtn' onClick={()=>handleClick()}>
                {text} <FaArrowRightLong />{" "}
              </button>
      )
  
}

export default GreenButton



