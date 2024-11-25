import React from "react";
import "../Bannar/Bannar.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

function Bannar() {
  return (
    <div className="container">
      <div className="banner">
        <div className="bigbanner">
          <p className="firstp">
            Fresh & Healthy <br></br>
            Organic Food
          </p>
          <div className="secp">
            <p>
              Sale up to
              <span> 30% OFF</span>
            </p>
            <p>Free shipping on all your order.</p>
          </div>
          <button>
            Shop now <FaArrowRightLong />{" "}
          </button>
        </div>
        <div className="bannertopright">
          <p>Summer Sale</p>
          <p>75% OFF</p>
          <p>Only Fruit & Vegetable</p>
          <p>
            <NavLink>
              Shop Now <FaArrowRightLong />
            </NavLink>
          </p>
        </div>
        <div className="bannerbuttomrigth">
          <p>Best Deal</p>
          <p>Special Products <br/> Deal of the Month</p>
          <p>
            <NavLink>
              Shop Now <FaArrowRightLong />
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Bannar;
