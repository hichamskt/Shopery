import React from 'react'
import '../Heading/Heading.css'
import { FaArrowRightLong } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

function Heading({heading,navigatto}) {
  return (
    <div className='container '>
        <div className='heading'>

        <p>{heading}</p>
        <p>
            <NavLink to={navigatto}>
              View All <FaArrowRightLong />
            </NavLink>
          </p>
        </div>
    </div>
  )
}

export default Heading