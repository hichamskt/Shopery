import React, { useEffect, useState } from "react";
import "../styles/ProductDetails.css";
import { NavLink, useParams } from "react-router-dom";
import axiosInstance from "../axios/axiosInstance";
import HeaderWhite from "../components/Header/HeaderWhite";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import ProductQuickView from "../components/ProductQuickView/ProductQuickView";
import Footer from "../components/Footer/Footer";
import { Link, Outlet } from "react-router-dom";
import vid from "../assets/videoplayback.mp4";
import vidreview from "../assets/vidrev.png";
import { IoPricetagsOutline } from "react-icons/io5";
import { ImLeaf } from "react-icons/im";
import { useCardContext } from "../contexts/CardContext";
import ShoppingCardPopup from "../components/ShoppingCardPopup/ShoppingCardPopup";

function ProductDetails() {
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { productid } = useParams();

  const { showCard, setShowCard, items, setItems } = useCardContext();

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const response = await axiosInstance.get(
          `/product/getproductbyid/${id}`
        );
        setProducts(response.data.product);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData(productid);
  }, [productid]);

  return (
    <div>
      {showCard && (
        <div
          className="shoping-ovlay"
          style={{
            opacity: showCard ? 1 : "",
            zIndex: showCard ? 10 : "",
          }}
        ></div>
      )}
      <ShoppingCardPopup />

      <HeaderWhite />
      {!loading && (
        <Breadcrumbs
          location={["Category", product?.category.name, product?.name]}
        />
      )}

      <div className="container">
        <div style={{
          height:"2rem"
        }}></div>
        {!loading && <ProductQuickView product={product} />}
        <NavBar />
        {!loading && (
          <div className="productoutlerbox">
            <Outlet context={product} />
            <div className="productoutlerbox-left">
              <VideoComponent />
              <Featurs />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetails;

function NavBar() {
  return (
    <nav className="productsNav">
      <NavLink
        to="."
        className={({ isActive }) => (isActive ? "active" : "")}
        end
      >
        Description
      </NavLink>

      <NavLink
        to="additionalinfo"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Additional Information
      </NavLink>

      <NavLink
        to="customerfeedback"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Customer Feedback
      </NavLink>
    </nav>
  );
}

const VideoComponent = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    const video = document.getElementById("videoElement");
    if (video) {
      video.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="video-container">
      <video id="videoElement" className="video-element" poster={vidreview}>
        <source src={vid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {!isPlaying && (
        <button className="play-button" onClick={handlePlay}>
          ▶
        </button>
      )}
    </div>
  );
};

const Featurs = () => {
  return (
    <div className="feat-p">
      <div className="feat-box">
        <IoPricetagsOutline />
        <div>
          <p>64% Discount</p>
          <p>Save your 64% money with us</p>
        </div>
      </div>
      <div className="feat-box">
        <ImLeaf />
        <div>
          <p>100% Organic</p>
          <p>100% Organic Vegetables</p>
        </div>
      </div>
    </div>
  );
};
