import React from 'react'
import '../BannerButton/BannerButton.css'
import { FaArrowRightLong } from 'react-icons/fa6'

function BannerButton() {
  return (
    <button className='bannerbtn'>
            Shop now <FaArrowRightLong />{" "}
          </button>
  )
}

export default BannerButton