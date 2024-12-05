import React from 'react'
import { useOutletContext } from 'react-router-dom'
import "../Descriptions/Descriptions.css"
import { FaCheckCircle } from "react-icons/fa";

function Descriptions() {

  const Product=useOutletContext();
 
  return (
    <div className='Descriptionss' ><p className='desc-textt'>{Product.description}</p>
      {
        Product.bulletPoint[0].split('.,').map((bullet,index)=>(
          
            
          <p  className='desc-bullet'  key={index}> 
          <FaCheckCircle />
             {bullet}
          </p>
          
        ))
      }
    
    </div>
  )
}

export default Descriptions