import React, { useEffect, useState } from "react";
import "../ProductQuickView/ProductQuickView.css";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import Rating from "../Rating/Rating";
import { TiSocialFacebook } from "react-icons/ti";
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaPinterestP } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { IoBagHandleOutline } from "react-icons/io5";
import { useCardContext } from "../../contexts/CardContext";

function ProductQuickView({ product }) {
  const { showCard, setShowCard, items, setItems } = useCardContext();

//add product to card 

  const hundleAddToCard = (newItem) => {
    setItems((prevItems) => {
      const exists = prevItems.find((item) => item.sku === newItem.sku);
      if (exists) {
        
        return prevItems.map((item) =>
          item.sku === newItem.sku
            ? { ...item, qnt: item.qnt + newItem.qnt }
            : item
        );
      } else {
        
        return [...prevItems, newItem];
      }
    });
    setShowCard(true);
  };


  useEffect(()=>{
    localStorage.setItem("cardItems", JSON.stringify(items));
  },[items])
  return (
    <div className="ProductQuickView">
      <ProductImages images={product.images} />
      <ProductsInfo hundleAddToCard={hundleAddToCard} product={product} />
    </div>
  );
}

export default ProductQuickView;

function ProductImages({ images }) {
  const [activeImg, setActiveImg] = useState(images[0]);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  function handlImageClick(image, i) {
    setActiveImg(image);
    setActiveImgIndex(i);
  }

  function handleArrowUp() {
    setActiveImgIndex((prv) => (prv === 0 ? images.length - 1 : prv - 1));
    setActiveImg(images[activeImgIndex]);
  }
  function handleArrowDown() {
    setActiveImgIndex((prv) => (prv === images.length - 1 ? 0 : prv + 1));
    setActiveImg(images[activeImgIndex]);
  }
  
  return (
    <div className="detaiproductsImages">
      <div className="d-images-list">
        <div className="arrowbox">
          <MdOutlineKeyboardArrowUp onClick={() => handleArrowUp()} />
        </div>
        {images.map((image, i) => (
          <div
            key={i}
            className={`d-image-box ${
              activeImgIndex === i ? "activeimage" : ""
            } `}
            onClick={() => handlImageClick(image, i)}
          >
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}${image}`}
              alt="product"
            />
          </div>
        ))}
        <div className="arrowbox">
          <IoIosArrowDown onClick={() => handleArrowDown()} />
        </div>
      </div>
      <div className="d-mainimag">
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}${activeImg}`}
          alt="product"
        />
      </div>
    </div>
  );
}

function ProductsInfo({ product, hundleAddToCard }) {
  const productAfterDiscount =
    product.price - (product.price * product.discount) / 100;

  return (
    <div className="productinfo-pq">
      <div className="pitopside">
        <p className="pi-name">{product.name}</p>
        {product.stock > 0 ? (
          <span
            style={{
              backgroundColor: "rgba(32, 181, 38, 0.2)",
              color: "#2C742F",
            }}
          >
            In Stock
          </span>
        ) : (
          <span
            style={{
              backgroundColor: "rgba(234, 75, 72, 0.1)",
              color: "#EA4B48",
            }}
          >
            Out Of Stock
          </span>
        )}
      </div>
      <div className="pi-ratingbox">
        <Rating rating={product.averageRating} />
        <p>{product.review.length} Review</p>
        <p>
          <span>SKU: </span>
          {product.sku}
        </p>
      </div>
      <div className="pi-pricebox">
        <span>
          {product.discount > 0 && (
            <p style={{ color: "#B3B3B3", textDecoration: "line-through" }}>
              ${product.price}{" "}
            </p>
          )}
          <p style={{ color: "#2C742F" }}>${productAfterDiscount}</p>
        </span>
        {product.discount > 0 && (
          <p className="pi-discount">{product.discount}% Off</p>
        )}
      </div>
      <hr />
      <div className="pi-bandlogobox">
        <div className="pi-brand">
          <p>Brand:</p>
          <div>
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}${product.brandLogo}`}
              alt="product"
            />
          </div>
        </div>
        <div className="pi-socials">
          <p>Share item:</p>
          <span>
            <TiSocialFacebook />
          </span>
          <span>
            <BsTwitterX />
          </span>
          <span>
            <FaPinterestP />
          </span>
          <span>
            <FaInstagram />
          </span>
        </div>
      </div>
      <p className="pi-brand-disc">{product.branddescription}</p>

      <AddToCardBox
        product={product}
        hundleAddToCard={hundleAddToCard}
        productAfterDiscount={productAfterDiscount}
      />
      <p className="pi-cat">
        Category:<span>{product.category.name}</span>
      </p>
      <p className="pi-cat">
        Tags:{" "}
        {product.tags[0].split(",").map((tag, i) => (
          <span key={i}>{tag}</span>
        ))}
      </p>
    </div>
  );
}

function AddToCardBox({ product, hundleAddToCard, productAfterDiscount }) {
  const [qnt, setQnt] = useState(1);

  return (
    <div className="pi-AddToCardBox">
      <div className="pi-a-qntbox">
        <button disabled={qnt <= 1} onClick={() => setQnt(qnt - 1)}>
          -
        </button>
        <p>{qnt}</p>
        <button disabled={qnt >= product.stock} onClick={() => setQnt(qnt + 1)}>
          +
        </button>
      </div>
      <button
        className="pi-addtocardbtn"
        onClick={() =>
          hundleAddToCard({
            sku: product.sku,
            image: product.images[0],
            name: product.name,
            qnt: qnt,
            price: productAfterDiscount,
          })
        }
      >
        Add To Card <IoBagHandleOutline />
      </button>
      <span className="pi-heart">
        <CiHeart />
      </span>
    </div>
  );
}
