import React, { useEffect, useState } from "react";
import "./TestimonialsCarousel.css";
import { FaQuoteRight } from "react-icons/fa";
import profile1 from "../../assets/profile1.jpg";
import profile2 from "../../assets/profile2.jpg";
import profile3 from "../../assets/profile4.jpg";
import profile4 from "../../assets/profile5.jpg";
import profile5 from "../../assets/profile3.jpg";
import profile6 from "../../assets/profile1.jpg";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Sarah Johnson",
    image: profile1,
    review:
      "I've been ordering from this website for over a year now, and the quality of the organic products is unmatched. My favorite is the fresh organic vegetables—they're always so flavorful and fresh!",
    rating: 5,
  },
  {
    name: "Mark Robinson",

    image: profile2,
    review:
      "Switching to organic has been life-changing, and this store makes it so easy. The selection is fantastic, and the delivery is always on time. I highly recommend the organic honey!",
    rating: 5,
  },
  {
    name: "Emily Carter",
    image: profile3,
    review:
      "This is my go-to store for all organic products. From fresh produce to skincare, everything is top-notch. Knowing I’m consuming healthy and natural products gives me peace of mind.",
    rating: 5,
  },
  {
    name: "David Lee",
    image: profile4,
    review:
      "The organic coffee I bought here is the best I've ever had! This store really pays attention to quality and customer satisfaction. I feel healthier and happier since I started shopping here.",
    rating: 4,
  },
  {
    name: "Sophia Martinez",

    image: profile5,
    review:
      "Amazing products and excellent service! I love their organic skincare line—it’s gentle and effective. My skin has never felt this good!",
    rating: 5,
  },
  {
    name: "John Doe",
    image: profile6,
    review:
      "The organic spices from this store have transformed my cooking! I also appreciate the eco-friendly packaging. Keep up the great work!",
    rating: 4,
  },
];

const products = [
  { id: 1, name: "Product 1", image: "", price: "$10" },
  { id: 2, name: "Product 2", image: "/path-to-image-2.jpg", price: "$20" },
  { id: 3, name: "Product 3", image: "/path-to-image-3.jpg", price: "$30" },
  { id: 4, name: "Product 4", image: "/path-to-image-4.jpg", price: "$40" },
  { id: 5, name: "Product 5", image: "/path-to-image-5.jpg", price: "$50" },
  { id: 6, name: "Product 6", image: "/path-to-image-6.jpg", price: "$60" },
];

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productsPerPage, setProductsPerPage] = useState(3);
 
  

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1200px)');
    const mobileQuery = window.matchMedia('(max-width: 700px)');

    const handleResize = () => {
      if (mobileQuery.matches) {
        setProductsPerPage(1);
      } else if (mediaQuery.matches) {
        setProductsPerPage(2);
      } else {
        setProductsPerPage(3); 
      }
    };
   
    handleResize();

    
    mediaQuery.addEventListener('change', handleResize);
    mobileQuery.addEventListener('change', handleResize);

    
    return () => {
      mediaQuery.removeEventListener('change', handleResize);
      mobileQuery.removeEventListener('change', handleResize);
    };
  }, []);
  


  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - productsPerPage : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= products.length - productsPerPage ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="container">
      <div className="TestimonialsCarousel">
        <div className="carouseltopsection">
          <p>Client Testimonials</p>
          <div className="carousel-btns">
            <span onClick={handlePrev}>
              <FaArrowLeftLong />
            </span>
            <span onClick={handleNext}>
              <FaArrowRightLong />
            </span>
          </div>
        </div>
        <div className="carousel-container">
          <div className="carousel">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${(currentIndex / productsPerPage) * 100}%)`,
                width: productsPerPage
                  ? '100%' 
                  : `${(products.length / productsPerPage) * 100 - 32}%`, 
              }}
            >
              {testimonials.map((testemonial, index) => (
                <Testemonial key={index} testemonial={testemonial} productsPerPage={productsPerPage} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;

function Testemonial({ testemonial ,productsPerPage}) {
  return (
    <div
      className="carousel-item"
      style={{
        flex: `0 0 ${(97) / productsPerPage}%`,
        backgroundColor: "white",
      }}
    >
      <FaQuoteRight className="carosalquotes" />
      <p className="testominial-text">{testemonial.review}</p>
      <div className="testo-profil-sec">
        <div className="testo-profile">
          <img src={testemonial.image} alt="profile" />
          <div className="testo-info">
            <p>{testemonial.name}</p>
            <p>Customer</p>
          </div>
        </div>
          <Rating rating={testemonial.rating} />
      </div>
    </div>
  );
}



const Rating = ({rating}) => {
  
  const items = [];

  for (let i = 1; i <= rating; i++) {
    items.push(<FaStar className='testo-yellow' key={rating-i} />);
  }

  

  return <div className='testo-rating'>{items}</div>;
};
