import React from 'react'
import '../styles/Account.css'
import Header from '../components/Header/Header'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import Navigation from '../components/Navigation/Navigation'
import { Outlet } from 'react-router-dom'

function Account() {
  return (
    <div>
        <Header />
        <Breadcrumbs location={["Account"]} />
        <div className='container'>
        <div className='userDashboard'>
        <Navigation />
        <Outlet />
        </div>
        </div>
    </div>
  )
}

export default Account