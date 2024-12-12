import React from 'react'
import '../styles/ShoppingCart.css'
import HeaderWhite from '../components/Header/HeaderWhite'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import { useCardContext } from '../contexts/CardContext'
import nocard from '../assets/Charco Location Map.png'
import { IoIosArrowBack } from "react-icons/io";
import { NavLink } from 'react-router-dom'


function ShoppingCart() {
    const {items} = useCardContext();

  return (
    <div>
        <HeaderWhite />
        <Breadcrumbs location={['Shopping Card']} />
       <div className='container'>

        {
            items?.length > 0 ? <div></div> : <div className='shoppingcardnoitms'>
                <img src={nocard} alt='no items' />
                <p>You Card Is Empty</p>
                <NavLink to='/shop' >
                <IoIosArrowBack/>
                Go To Shop
                </NavLink>
            </div>
        }
        </div>
    </div>
  )
}

export default ShoppingCart