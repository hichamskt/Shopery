import React, { useEffect } from "react";
import "../styles/ShoppingCart.css";
import HeaderWhite from "../components/Header/HeaderWhite";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import { useCardContext } from "../contexts/CardContext";
import nocard from "../assets/Charco Location Map.png";
import { IoIosArrowBack } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import { RxCrossCircled } from "react-icons/rx";
import Footer from '../components/Footer/Footer'
function ShoppingCart() {
  const { items, setItems } = useCardContext();
  const navigat = useNavigate();
 useEffect(()=>{
    localStorage.setItem("cardItems", JSON.stringify(items));
  },[items])

  return (
    <div>
      <HeaderWhite />
      <Breadcrumbs location={["Shopping Card"]} />
      <div className="container">
        {items?.length > 0 ? (
          <div className="shoppincard-container">
            <p className="myshc">My Shopping Cart</p>
            <div className="shoppincard">
              <ShoppingItemsBox items={items} setItems={setItems}/>
              <CartTotal items={items} />
            </div>
          </div>
        ) : (
          <div className="shoppingcardnoitms">
            <img src={nocard} alt="no items" />
            <p onClick={()=>navigat('/')}>You Card Is Empty</p>
            <NavLink to="/shop">
              <IoIosArrowBack />
              Go To Shop
            </NavLink>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
}

export default ShoppingCart;

function ShoppingItemsBox({ items , setItems }) {

  const navigat = useNavigate();
  return (
    <div>
    <div className="shoppingboxtable">
      <div className="sbtableheader">
        <p>Product</p>
        <p>price</p>
        <p>Quantity</p>
        <p>Subtotal</p>
      </div>
      <div style={{ padding: "1rem" }}>
        {items.map((item, i) => (
          <TableRow key={i} item={item} setItems={setItems} />
        ))}
      </div>
      <div className="shoppingbgbtnbox">
        <button onClick={()=>navigat('/shop')}>Return to shop</button>
      </div>
    </div>
        <CouponCode/>
        </div>
  );
}

function TableRow({ item, setItems }) {
  
  const handleDeleteFromCart = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.sku !== id));
  };

  const hundleMinusQnt = (id) => {
    setItems((prevItems) => {
      return prevItems.map((item) =>
        item.sku === id ? { ...item, qnt: item.qnt - 1 } : item
      );
    });
  };
  const hundleAddQnt = (id) => {
    setItems((prevItems) => {
     return prevItems.map((item) =>
       item.sku === id
         ? { ...item, qnt: item.qnt + 1 }
         : item
     );
   
 });
   
 }



  return (
    <div className="shoppingtablerow">
      <div className="sbimgrow">
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}${item.image}`}
          alt="itm"
        />
        <p>{item.name}</p>
      </div>
      <p>${item.price.toFixed(2)}</p>
      <div className="sb-a-qntbox">
        <button
          disabled={item.qnt <= 1}
          onClick={() => hundleMinusQnt(item.sku)}
        >
          -
        </button>
        <p>{item.qnt}</p>
        <button  onClick={() => hundleAddQnt(item.sku)}>+</button>
      </div>
      <p>${(item.price * item.qnt).toFixed(2)}</p>
      <RxCrossCircled onClick={()=>handleDeleteFromCart(item.sku)} />
    </div>
  );
}


function CouponCode () {

  
  return<div className="CouponCodecontainer">
    <p>Coupon Code</p>
    <div className="input">
    <input type="text"  placeholder="Enter code" />
    <button>Apply Coupon</button>
    </div>
  </div>
}


function CartTotal ({items}){
  const navigate = useNavigate();

const total = items.reduce((total, item) => total + (item.price * item.qnt), 0);

  return<div className="sgcardttl">
<p className="sgcardttlp">Cart Total</p>
<div>
  <p>Subtotal:</p>
  <p>${total.toFixed(2)}</p>
</div>
<div>
  <p>Shipping:</p>
  <p>Free</p>
</div>
<div>
  <p>Total:</p>
  <p>${total.toFixed(2)}</p>
</div>
<button onClick={()=>navigate('/checkout')}>
Proceed to checkout</button>
  </div>
}