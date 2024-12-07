import React from "react";
import "../styles/Contact.css";
import HeaderWhite from "../components/Header/HeaderWhite";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import { PiMapPinLine } from "react-icons/pi";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import GreenButton from "../UI/GreenButton/GreenButton";
import Footer from "../components/Footer/Footer"
import { useCardContext } from "../contexts/CardContext";
import ShoppingCardPopup from "../components/ShoppingCardPopup/ShoppingCardPopup";
function Contact() {
  const { showCard } = useCardContext();

  return (
    <div>
      { showCard && <div className="shoping-ovlay" style={{
        opacity:showCard? 1 : "",
        zIndex:showCard?10:""
      }}></div>}
       <ShoppingCardPopup />

      <HeaderWhite />
      <Breadcrumbs location={["Contact"]} />
      <div className="container">
        <div className="contact-container">
          <ContactInfos />
          <ContactForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;

function ContactInfos() {
  return (
    <div className="contactinfo">
      <div>
        <PiMapPinLine />
        <div>
          <p>2715 Ash Dr. San Jose, South</p>
          <p> Dakota 83475</p>
        </div>
      </div>
      <hr/>
      <div>
        <MdOutlineEmail />
        <div>
          <p>Proxy@gmail.com</p>
          <p>Help.proxy@gmail.com</p>
        </div>
      </div>
      <hr/>
      <div>
        <FiPhoneCall />
        <div>
          <p>(219) 555-0114</p>
          <p>(164) 333-0487</p>
        </div>
      </div>

    </div>
  );
}

function ContactForm() {
  return (
    <div className="contactform">
      <p>Just Say Hello!</p>
      <p>
        We’d love to hear from you! Whether you have a question, feedback, or
        just want to chat about organic living, feel free to reach out. Our team
        is here to help and connect with you! 🌿
      </p>
      <form>
        <div className="contact-inputs">
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="example@gmail.com" />
        </div>
        <input type="text" placeholder="subject" />
        <textarea
          rows="5"
          cols="50"
          placeholder="Message (max 200 characters)..."
        />
        <div>
          <GreenButton text={"Send Message"} />
        </div>
      </form>
    </div>
  );
}
