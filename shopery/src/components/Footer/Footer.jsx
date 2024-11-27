import React from "react";
import "../Footer/Footer.css";
import { TiSocialFacebook } from "react-icons/ti";
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaPinterestP } from "react-icons/fa";
import logo from "../../assets/Logo1.png";
import img1 from "../../assets/pay.png";
import img2 from "../../assets/pay2.png";
import img3 from "../../assets/pay3.png";
import img4 from "../../assets/pay4.png";
import img5 from "../../assets/pay5.png";

function Footer() {
  return (
    <div>
      <Subscribe />
      <BottomFooter />
    </div>
  );
}

export default Footer;

function Subscribe() {
  return (
    <div className="greybackground">
      <div className="container">
        <div className="subscribesection">
          <div className="subscribe-left">
            <p>Subcribe our Newsletter</p>
            <p>
              Stay connected with our sustainable, eco-friendly products.
              Subscribe to our newsletter for updates on organic offers, new
              arrivals, and tips for a greener lifestyle delivered straight to
              your inbox.
            </p>
          </div>
          <div className="subscribe-right">
            <div className="inputsubscribe">
              <input type="text" placeholder="Your email address" />
              <button>Subscribe</button>
            </div>
            <div className="subscribesocials">
              <span>
                <TiSocialFacebook />
              </span>
              <span>
                <BsTwitterX />
              </span>
              <span>
                <FaInstagram />
              </span>
              <span>
                <FaPinterestP />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BottomFooter() {
  return (
    <div className="greybackground" style={{ backgroundColor: "black" }}>
      <div className="container">
        <div className="bottomFooter">
          <div className="b-firstpart">
            <div>
            <img src={logo} alt="logo" />

            </div>
            <p className="footertxt">
              Experience the Best of Organic Living! Discover a wide range of
              eco-friendly, sustainable, and organic products crafted to support
              your health and the planet.
            </p>
            <span>
              <p>(219) 555-0114</p>
              <p>or</p>
              <p>Proxy@gmail.com</p>
            </span>
          </div>
          <ul>
            <li>My Account</li>
            <li>My Account</li>
            <li>Order History</li>
            <li>Shoping Cart</li>
            <li>Wishlist</li>
          </ul>
          <ul>
            <li>Helps</li>
            <li>Contact </li>
            <li>Faqs</li>
            <li>Terms & Condition</li>
            <li>Privacy Policy</li>
          </ul>

          <ul>
            <li> Proxy</li>
            <li>About</li>
            <li>Shop</li>
            <li>Product</li>
            <li>rack Order</li>
          </ul>

          <ul>
            <li>Categories</li>
            <li>Fruit & Vegetables</li>
            <li>Meat & Fish </li>
            <li>Bread & Bakery</li>
            <li>Beauty & Health</li>
          </ul>
        </div>
        <div className="copyrigth">
            <p>Ecobazar eCommerce © 2021. All Rights Reserved</p>
            <div>
                <img src={img1} alt="payment" />
                <img src={img2} alt="payment" />
                <img src={img3} alt="payment" />
                <img src={img4} alt="payment" />
                <img src={img5} alt="payment" />
            </div>
        </div>
      </div>
    </div>
  );
}
