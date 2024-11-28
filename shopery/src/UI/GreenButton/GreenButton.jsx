import React from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'
import '../GreenButton/GreenButton.css'
function GreenButton({text}) {
 
    return (
        <button className='greenbtn'>
                {text} <FaArrowRightLong />{" "}
              </button>
      )
  
}

export default GreenButton



