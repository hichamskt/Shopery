import React, { useState } from "react";
import "../styles/About.css";
import HeaderWhite from "../components/Header/HeaderWhite";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import firstheroimg from "../assets/about1.png";

import thirdheroimg from "../assets/about2-1.png";
import forthheroimg from "../assets/about3.png";


import w1 from "../assets/w1.png";
import w2 from "../assets/w2.png";
import w3 from "../assets/w3.png";
import w4 from "../assets/w4.png";

import { TiSocialFacebook } from "react-icons/ti";
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaPinterestP } from "react-icons/fa";

import BannerButton from "../UI/BannerButton/BannerButton"

import { RiLeafLine } from "react-icons/ri";
import { IoSparklesOutline } from "react-icons/io5";
import { LiaShippingFastSolid } from "react-icons/lia";
import { BiSolidSpeaker, BiSupport } from "react-icons/bi";
import { BsBagCheck } from "react-icons/bs";
import { LuBox } from "react-icons/lu";
import GreenButton from "../UI/GreenButton/GreenButton";
import TestimonialsCarousel from "../components/TestimonialsCarousel/TestimonialsCarousel";
import CompanyLogo from "../components/CompanyLogo/CompanyLogo";
import Footer from "../components/Footer/Footer";


function About() {
  return (
    <div>
      <HeaderWhite />
      <Breadcrumbs location={["About"]} />
      <AboutFirstHero />
      <AboutSecondHero />
      <AboutThirdHero />
      <div style={{backgroundColor:"#F2F2F2"}}>

      <Team />
      </div>
      <div className='greybackground'>
        <TestimonialsCarousel />
      </div>
      <CompanyLogo />
      <Footer />
    </div>
  );
}

export default About;

function AboutFirstHero() {
  return (
    <div style={{ padding: "5rem 1rem" }}>
      <div className="container">
        <div className="firsthero">
          <div className="firsthertext">
            <p>100% Trusted Organic Food Store</p>
            <p>
              Welcome to your one-stop destination for fresh, high-quality
              organic products. We are committed to delivering food that's free
              from harmful chemicals, grown sustainably, and packed with natural
              goodness. Every product in our store is carefully sourced from
              trusted organic farms to ensure the best for your health and the
              environment. Shop with confidence and join us in embracing a
              healthier, greener lifestyle!
            </p>
          </div>
          <div>
            <img src={firstheroimg} alt="farmer" />
          </div>
        </div>
      </div>
    </div>
  );
}



function AboutSecondHero(){

  return (
    <div className="aboutSeconsHero">
      <div className="container">
        <div className="aboutsecbox">
        <div className="aboutsecimg">
          <img src={thirdheroimg} alt="farmer" />
        </div>
        <div className="about-sl">
          <p className="abttl"> Your Gateway to Fresh, Pure, and Organic Living!</p>
          <p className="abbtxt">
            Discover the finest organic foods sourced directly from trusted
            farms. Enjoy a healthier lifestyle with products that care for you
            and the planet!
          </p>
          <div className="aboutboxes">
            <div className="aboutfbox">
              <span>
                <RiLeafLine />
              </span>
              <div>
                <p>100% Organic food</p>
                <p>100% healthy & Fresh food.</p>
              </div>
            </div>
            <div  className="aboutfbox">
              <span>
                <BiSupport />
              </span>
              <div>
                <p>Great Support 24/7</p>
                <p>Instant access to Contact</p>
              </div>
            </div>
            <div className="aboutfbox">
              <span>
                <IoSparklesOutline/>
              </span>
              <div>
                <p>Customer Feedback</p>
                <p>Our happy customer</p>
              </div>
            </div>

            <div className="aboutfbox">
              <span>
                <BsBagCheck />
              </span>
              <div>
                <p>100% Sucure Payment</p>
                <p>We ensure your money is save</p>
              </div>
            </div>

            <div className="aboutfbox">
              <span>
                <LiaShippingFastSolid/>
              </span>
              <div>
                <p>100% Sucure Payment</p>
                <p>We ensure your money is save</p>
              </div>
            </div>

            <div className="aboutfbox">
              <span>
                <LuBox/>
              </span>
              <div>
                <p>100% Organic Food</p>
                <p>100% healthy & Fresh food.</p>
              </div>
            </div>

          </div>
        </div>

        </div>
        
      </div>
    </div>
  );
}

function AboutThirdHero(){
 return <div className="container">
  <div className="aboutthirdhero">
    <div className="aboutthirdtext">
    <p>We Delivered, You Enjoy Your Order.</p>
<p> Fresh, organic goodness brought straight to your doorstep with love and care. Relax, savor the taste of nature, and let us handle the rest for your perfect, healthy lifestyle!</p>
 <p className="ab-ckeck">✅ 100% Certified Organic Products</p>
<p className="ab-ckeck">✅ Fast & Reliable Delivery</p>
<p className="ab-ckeck">✅ Supporting Sustainable Farming Practices</p>
<div>
<GreenButton />
  </div>
    </div>
   <img src={forthheroimg} alt="img"/>
  </div>
  </div>
}


const workers =[
  {
    name:"Jenny Wilson",
    role:"Ceo & Founder",
    image:w1
  },
  {
    name:"Jane Cooper",
    role:"Worker",
    image:w2
  },
  {
    name:"Cody Fisher",
    role:"Security Guard",
    image:w3
  },
  {
    name:"Robert Fox",
    role:"Senior Farmer Manager",
    image:w4
  },
  ]

function Team (){

  return(
<div className="container">
<div className="team">
<p className="team-ttl">Our Awesome Team</p>
<p className="team-p">Dedicated to  quality and sustainability, our team ensures you enjoy the finest organic products with every order!</p>
<div className="teamcards">
  {
    workers.map((worker,index)=>(
      <TeamCard worker={worker} key={index} />
    ))
  }
</div>
</div>
</div>
  )
}

function TeamCard ({worker}){
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true); 
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false); 
  };
  
  return<div className="teamcard"  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}> 
    <div className="team-img" >
      <div className="texamsocials" style={{
        display:isHovered?"flex":"none"
      }}>
        <span><TiSocialFacebook/></span>
        <span><FaInstagram/></span>
        <span><BsTwitterX /></span>
        <span><FaPinterestP/></span>
      </div>
      <div className="team-ovrlay" style={{
        display:isHovered?"flex":"none"
      }}></div>
    <img src={worker.image} alt="worker" />

    </div>
    <div className="workertext">
      <p>{worker.name}</p>
      <p>{worker.role}</p>
    </div>
  </div>
}