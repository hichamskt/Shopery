import React from "react";
import "../ShoppingCardPopup/ShoppingCardPopup.css";
import { useCardContext } from "../../contexts/CardContext";
import { RxCrossCircled } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import emtycard from "../../assets/Charco Location Map.png";

function ShoppingCardPopup() {
  const { showCard, setShowCard, items, setItems } = useCardContext();

  const total = items.reduce((total, item) => {
    return total + item.price * item.qnt;
  }, 0);

  const handleDeleteFromCart = (sku) => {
    setItems((prevItems) => prevItems.filter((item) => item.sku !== sku));
  };

  
  return (
    <div className="ShoppingCardPopup" style={{
        right:showCard? 0 : ""
    }}>
      {items.length > 0 ? (
        <div className="ShoppingCard-container">
          <div className="shopingitemwrapper">
            <div className="topspc">
              <p className="shoppingcardttl">Shopping Card ({items.length})</p>
              <RxCross1 onClick={()=>setShowCard(false)} />
            </div>
            {items.map((item, i) => (
              <Item
                key={i}
                item={item}
                handleDeleteFromCart={handleDeleteFromCart}
              />
            ))}
          </div>

          <div className="ShoppingCardbtmpart">
            <div className="sh-c-bp">
              <p>{items.length} Products</p>
              <p>${total.toFixed(2)}</p>
            </div>
            <button>Checkout</button>
            <button>Go To Cart</button>
          </div>
        </div>
      ) : (
        <div className="empycardss">
          <img src={emtycard} alt="emtycard"></img>
          <RxCross1  onClick={()=>setShowCard(false)} />
          <p>Oops! There's nothing in your cart yet</p>
        </div>
      )}
    </div>
  );
}

export default ShoppingCardPopup;

const Item = ({ item, handleDeleteFromCart }) => {
  return (
    <div className="shopingcarditem">
      <img
        src={`${process.env.REACT_APP_BACKEND_URL}${item.image}`}
        alt="item"
      />
      <div className="item-texts">
        <p>{item.name}</p>
        <p>
          1kg x <span>{item.price}</span>{" "}
        </p>
      </div>
      <RxCrossCircled onClick={() => handleDeleteFromCart(item.sku)} />
    </div>
  );
};
