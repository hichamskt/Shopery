import React from 'react'
import "../styles/Checkout.css"
import HeaderWhite from '../components/Header/HeaderWhite'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import { useCardContext } from '../contexts/CardContext'
import useAuth from '../hooks/useAuth'

function Checkout() {
    const {items} = useCardContext();
    const {auth} =useAuth();
  return (
    <div>
        <HeaderWhite />
        <Breadcrumbs location={['Checkout']} />
        <div className='container'></div>
    </div>
  )
}

export default Checkout