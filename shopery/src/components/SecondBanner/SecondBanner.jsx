import React from 'react'
import "../SecondBanner/SecondBanner.css"
import BannerButton from '../../UI/BannerButton/BannerButton'
function SecondBanner() {
  return (
    <div className='container'>
        <div className='secondbanner'>
        <LeftBanner />
        <MidBanner />
        <RightBanner />
        </div>
    </div>
  )
}

export default SecondBanner


function LeftBanner(){
    return<div className='leftbanner secndbannercard'>
            <p className='topbb'>Best Deals</p>
            <p className='bannersecttl'>Sale of the Month</p>
            <div className='countdown'>
                <span>
                    <p className='counttop'>00</p>
                    <p  className='countbtm'>Days</p>
                </span>
                <p className='counttop'>:</p>
                <span>
                    <p className='counttop'>02
                    </p>
                    <p  className='countbtm'>Hours</p>
                </span>
                <p className='counttop'>:</p>
                <span>
                    <p className='counttop'>18
                    
                    </p>
                    <p  className='countbtm'>Mins</p>
                </span>
                <p className='counttop'>:</p>
                <span>
                    <p className='counttop'>46
                    </p>
                    <p className='countbtm'>Secs</p>
                </span>
            </div>
            <BannerButton />
    </div>
}
function MidBanner(){
    return<div className='midbanner secndbannercard'>
        <p className='topbb'>85% Fat Free</p>
        <p className='bannersecttl'>Low-Fat Meat</p>
        <p>Started at
       <span > $79.99</span></p>
       <BannerButton />
    </div>
}
function RightBanner(){
    return<div className='rigthBanner secndbannercard'>
        <p className='topbb lb'>Summer Sale</p>
        <p className='bannersecttl bnlft'>100% Fresh Fruit</p>
        <p>Up to <span> 64% OFF</span></p>
        <BannerButton />

    </div>
}