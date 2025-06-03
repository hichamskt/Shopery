import React, { useState } from "react";
import "../styles/HomePage.css";
import Header from "../components/Header/Header";
import Bannar from "../components/Bannar/Bannar";
import Featured from "../components/Featured/Featured";
import Heading from "../components/Heading/Heading";
import Categories from "../components/Categories/Categories";

import { FiEye, FiHeart } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { IoBagHandleOutline } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";

import pop1 from "../assets/radish.png";
import pop2 from "../assets/pop2.png";
import pop3 from "../assets/pop3.png";
import pop4 from "../assets/pop4.png";
import pop5 from "../assets/pop5.png";
import pop6 from "../assets/pop6.png";
import pop7 from "../assets/pop7.png";
import new1 from "../assets/news1.png";
import new2 from "../assets/news2.png";
import new3 from "../assets/news3.png";

import insta1 from "../assets/instapost.png";
import insta6 from "../assets/instapost6.png";
import insta3 from "../assets/instapost2.png";
import insta4 from "../assets/instapost3.png";
import insta5 from "../assets/instapost4.png";
import insta2 from "../assets/instapost5.png";

import ProductCard from "../components/ProductCard/ProductCard";
import SecondBanner from "../components/SecondBanner/SecondBanner";
import DiscountBannar from "../components/DiscountBannar/DiscountBannar";
import NewsCard from "../components/NewsCard/NewsCard";
import TestimonialsCarousel from "../components/TestimonialsCarousel/TestimonialsCarousel";
import Footer from "../components/Footer/Footer";
import CompanyLogo from "../components/CompanyLogo/CompanyLogo";
import SubscribePopup from "../components/SubscribePopup/SubscribePopup";
import axiosInstance from "../axios/axiosInstance";
import ShoppingCardPopup from "../components/ShoppingCardPopup/ShoppingCardPopup";
import { useCardContext } from "../contexts/CardContext";

function HomePage() {
  const { showCard, setShowCard, items, setItems } = useCardContext();

  return (
    <div>
      {/* <SubscribePopup /> */}
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
      <Header />
      <Bannar />
      <Featured />
      <Heading heading="Popular Categories" navigatto="/" />
      <Categories />
      <Heading heading="Popular Products" navigatto="/" />
      <PopularProducts />
      <SecondBanner />
      <div className="greybackground">
        <Heading heading="Hot Deals" navigatto="/" />
        <HotDeals />
      </div>
      <DiscountBannar />
      <Heading heading="Featured Products" navigatto="/" />
      <FeaturedProducts />
      <LatestNews />
      <div className="greybackground">
        <TestimonialsCarousel />
      </div>
      <CompanyLogo />
      <FollowUs />
      <Footer />
    </div>
  );
}

export default HomePage;

const dummyNewsData = [
  {
    title:
      "Oranges are more than just a sweet, tangy fruit—they’re nature's powerhouse of flavor and nutrition!",
    images: new1,
    topic: "Food",
    createdAt: "17",
    comments: 3,
  },
  {
    title:
      "Did you know that eggs are one of the most nutritious foods on the planet? ",
    images: new2,
    topic: "Food",
    createdAt: "17",
    comments: 4,
  },
  {
    title:
      "Salads are the perfect blend of health and taste, offering endless possibilities to keep your meals exciting.",
    images: new3,
    topic: "Food",
    createdAt: "17",
    comments: 3,
  },
];

function LatestNews() {
  return (
    <div className="container">
      <div className="latestnews">
        <p className="platest">Latest News</p>
        <div className="news">
          {dummyNewsData.map((news, i) => (
            <NewsCard news={news} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

const dummyPopularProducts = [
  {
    name: "Green Apple",
    price: 20,
    images: pop1,
    discount: 50,
    rating: [],
  },
  {
    name: "Red Grapes",
    price: 15,
    images: pop2,
    discount: 30,
    rating: [
      { userid: "user1", rating: 4 },
      { userid: "user2", rating: 5 },
      { userid: "user3", rating: 5 },
      { userid: "user4", rating: 4 },
    ],
  },
  {
    name: "Orange Juice",
    price: 25,
    images: pop3,
    discount: 0,
    rating: [
      { userid: "user5", rating: 0 },
      { userid: "user6", rating: 4 },
      { userid: "user7", rating: 4 },
      { userid: "user8", rating: 3 },
    ],
  },
  {
    name: "Banana",
    price: 10,
    images: pop4,
    discount: 10,
    rating: [
      { userid: "user9", rating: 4 },
      { userid: "user10", rating: 4 },
      { userid: "user11", rating: 5 },
      { userid: "user12", rating: 5 },
    ],
  },
  {
    name: "Strawberries",
    price: 40,
    images: pop5,
    discount: 0,
    rating: [
      { userid: "user13", rating: 5 },
      { userid: "user14", rating: 5 },
      { userid: "user15", rating: 4 },
      { userid: "user16", rating: 3 },
    ],
  },
  {
    name: "Watermelon",
    price: 35,
    images: pop6,
    discount: 0,
    rating: [
      { userid: "user17", rating: 4 },
      { userid: "user18", rating: 4 },
      { userid: "user19", rating: 5 },
      { userid: "user20", rating: 5 },
    ],
  },
  {
    name: "Mango",
    price: 50,
    images: pop7,
    discount: 0,
    rating: [
      { userid: "user21", rating: 5 },
      { userid: "user22", rating: 4 },
      { userid: "user23", rating: 3 },
      { userid: "user24", rating: 5 },
    ],
  },
];

function PopularProducts() {
  return (
    <div className="container">
      <div className="popularproducts">
        {dummyPopularProducts.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </div>
  );
}

const hotDealsdummydata = [
  {
    name: "Green Apple",
    price: 20,
    images: pop1,
    discount: 50,
    rating: [],
  },
  {
    name: "Red Grapes",
    price: 15,
    images: pop2,
    discount: 30,
    rating: [
      { userid: "user1", rating: 4 },
      { userid: "user2", rating: 5 },
      { userid: "user3", rating: 5 },
      { userid: "user4", rating: 4 },
    ],
  },
  {
    name: "Orange Juice",
    price: 25,
    images: pop3,
    discount: 0,
    rating: [
      { userid: "user5", rating: 0 },
      { userid: "user6", rating: 4 },
      { userid: "user7", rating: 4 },
      { userid: "user8", rating: 3 },
    ],
  },
  {
    name: "Banana",
    price: 10,
    images: pop4,
    discount: 10,
    rating: [
      { userid: "user9", rating: 4 },
      { userid: "user10", rating: 4 },
      { userid: "user11", rating: 5 },
      { userid: "user12", rating: 5 },
    ],
  },
  {
    name: "Strawberries",
    price: 40,
    images: pop5,
    discount: 20,
    rating: [
      { userid: "user13", rating: 5 },
      { userid: "user14", rating: 5 },
      { userid: "user15", rating: 4 },
      { userid: "user16", rating: 3 },
    ],
    review: [
      { id: "user", review: "aaaaa" },
      { id: "user", review: "aaaaa" },
      { id: "user", review: "aaaaa" },
      { id: "user", review: "aaaaa" },
    ],
  },
  {
    name: "Strawberries",
    price: 40,
    images: pop5,
    discount: 0,
    rating: [
      { userid: "user13", rating: 5 },
      { userid: "user14", rating: 5 },
      { userid: "user15", rating: 4 },
      { userid: "user16", rating: 3 },
    ],
  },
  {
    name: "Strawberries",
    price: 40,
    images: pop5,
    discount: 0,
    rating: [
      { userid: "user13", rating: 5 },
      { userid: "user14", rating: 5 },
      { userid: "user15", rating: 4 },
      { userid: "user16", rating: 3 },
    ],
  },
  {
    name: "Watermelon",
    price: 35,
    images: pop6,
    discount: 0,
    rating: [
      { userid: "user17", rating: 4 },
      { userid: "user18", rating: 4 },
      { userid: "user19", rating: 5 },
      { userid: "user20", rating: 5 },
    ],
  },
  {
    name: "Mango",
    price: 50,
    images: pop7,
    discount: 0,
    rating: [
      { userid: "user21", rating: 5 },
      { userid: "user22", rating: 4 },
      { userid: "user23", rating: 3 },
      { userid: "user24", rating: 5 },
    ],
  },
  {
    name: "Mango",
    price: 50,
    images: pop7,
    discount: 0,
    rating: [
      { userid: "user21", rating: 5 },
      { userid: "user22", rating: 4 },
      { userid: "user23", rating: 3 },
      { userid: "user24", rating: 5 },
    ],
  },
  {
    name: "Mango",
    price: 50,
    images: pop7,
    discount: 0,
    rating: [
      { userid: "user21", rating: 5 },
      { userid: "user22", rating: 4 },
      { userid: "user23", rating: 3 },
      { userid: "user24", rating: 5 },
    ],
  },
];

function HotDeals() {
  const [rating, setRating] = useState(
    hotDealsdummydata[4].rating?.length > 0
      ? hotDealsdummydata[4].rating?.reduce(
          (acc, rate) => acc + rate.rating,
          0
        ) / hotDealsdummydata[4].rating.length
      : 0
  );

  
  return (
    <div className="container">
      <div className="hotdeals">
        <div className="hotdealsBigcard">
          {hotDealsdummydata[4].discount > 0 && (
            <p className="bigcard-hd">Sale {hotDealsdummydata[4].discount}%</p>
          )}
          <p className="bg-bestseller">Best Sale</p>
          <img src={hotDealsdummydata[2].images} alt="product" />
          <div className="bg-midsection">
            <div className="bg-icons">
              <FiHeart />
            </div>
            <button>
              Add to Cart <IoBagHandleOutline />{" "}
            </button>
            <div className="bg-icons">
              <FiEye />
            </div>
          </div>
          <div className="bg-bsection">
            <p className="bg-pdname">{hotDealsdummydata[4].name}</p>
            {hotDealsdummydata[4].discount > 0 ? (
              <span className="bg-prices">
                <p>
                  $
                  {hotDealsdummydata[4].price -
                    (hotDealsdummydata[4].discount *
                      hotDealsdummydata[4].price) /
                      100}
                </p>
                <p>${hotDealsdummydata[2].price}</p>
              </span>
            ) : (
              <p className="bg-pricez">${hotDealsdummydata[2].price}</p>
            )}

            <div className="bg-ratingnfb">
              <Rating rating={rating} />
              {hotDealsdummydata[4].review.length > 0 && (
                <p className="bg-feedback">
                  ({hotDealsdummydata[4].review.length} Feedback)
                </p>
              )}
            </div>
            <p className="bg-catch">Hurry up! Offer ends In:</p>
            <div className="countdown">
              <span>
                <p className="counttop">00</p>
                <p className="countbtm">Days</p>
              </span>
              <p className="counttop">:</p>
              <span>
                <p className="counttop">02</p>
                <p className="countbtm">Hours</p>
              </span>
              <p className="counttop">:</p>
              <span>
                <p className="counttop">18</p>
                <p className="countbtm">Mins</p>
              </span>
              <p className="counttop">:</p>
              <span>
                <p className="counttop">46</p>
                <p className="countbtm">Secs</p>
              </span>
            </div>
          </div>
        </div>
        {hotDealsdummydata.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}

const Rating = ({ rating }) => {
  const items = [];

  for (let i = 1; i <= rating; i++) {
    items.push(<FaStar className="start-yellow" key={rating - i} />);
  }
  for (let i = 1; i <= Math.ceil(5 - rating); i++) {
    items.push(<FaStar key={100 + i} className="star-grey"></FaStar>);
  }

  return <div className="pc-rating">{items}</div>;
};

function FeaturedProducts() {
  return (
    <div className="container">
      <div className="FeaturedProducts">
        {dummyPopularProducts.slice(0, 5).map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}

const arr = [insta1, insta2, insta3, insta4, insta5, insta6];
function FollowUs() {
  return (
    <div className="container">
      <div className="folowus">
        <p>Follow us on Instagram</p>
        <div className="folowusgallary">
          {arr.map((image, i) => (
            <InstaImagBox key={i} image={image} />
          ))}
        </div>
      </div>
    </div>
  );
}

function InstaImagBox({ image }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="instaimgbox"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={image} alt="gallery" />
      <div
        className="overlaygreen"
        style={{ display: isHovered ? "block" : "" }}
      ></div>
      <FaInstagram style={{ display: isHovered ? "block" : "" }} />
    </div>
  );
}
