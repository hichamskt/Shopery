import React, { useState } from "react";
import "../styles/Checkout.css";
import HeaderWhite from "../components/Header/HeaderWhite";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import emtycard from "../assets/Charco Location Map.png";

import { useCardContext } from "../contexts/CardContext";
import useAuth from "../hooks/useAuth";
import { NavLink } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import BillingInput from "../UI/BillingInput/BillingInput";
import BillingSelectInput from "../UI/BillingSelectInput/BillingSelectInput";

function Checkout() {
  const { items } = useCardContext();
  const { auth } = useAuth();
  return (
    <div>
      <HeaderWhite />
      <Breadcrumbs location={["Shopping Cart", "Checkout"]} />

      <div className="container">
        {items?.length > 0 ? (
          <CheckoutPage auth={auth} items={items} />
        ) : (
          <div className="shoppingcardnoitms">
            <img src={emtycard} alt="no items" />
            <p>You Card Is Empty</p>
            <NavLink to="/shop">
              <IoIosArrowBack />
              Go To Shop
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;

function CheckoutPage({ auth, items }) {
  const [values, setValues] = useState({
    billingFirstName: "",
    billingLastName: "",
    companyName: "",
    streetAdresse: "",
    billingRegion: "",
    city: "",
    zipCode: "",
    billingEmail: "",
    billingphoneNumber: "",
    shiptodiffaddress: false,
    OrderNotes: "",
  });
  const [errors, setErrors] = useState({});
  const handleGoToshipform =()=>{


    const newErrors = {};

    if (!values.billingEmail.trim()) {
      newErrors.billingEmail = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(values.billingEmail)) {
      newErrors.billingEmail = "Enter a valid email address.";
    }
    if (!values.zipCode.trim()) {
      newErrors.zipCode = "zipCode is required.";
    } else if (/[0-9]{5}/.test(values.zipCode)) {
      newErrors.zipCode = "It should be a valid ZipCode!";
    }
    if (!values.billingphoneNumber.trim()) {
      newErrors.billingphoneNumber = "Phone Number is required.";
    } else if (/[0-9]{9,11}/.test(values.billingphoneNumber)) {
      newErrors.billingphoneNumber = "It should be a valid Phone Number!";
    }
    if (!values.billingphoneNumber.trim()) {
      newErrors.billingphoneNumber = "Phone Number is required.";
    } else if (/[0-9]{9,11}/.test(values.billingphoneNumber)) {
      newErrors.billingphoneNumber = "It should be a valid Phone Number!";
    }
    if (!values.billingRegion.trim()) {
      newErrors.billingRegion = "This field is required.";
    } 
    if (!values.city.trim()) {
      newErrors.city = "This field is required.";
    } 


    
    if (!values.billingFirstName.trim()) {
      newErrors.billingFirstName = "First Name Is required";
    } else if (!/^[A-Za-z]{2,15}$/.test(values.billingFirstName)) {
      newErrors.billingFirstName ="First name  must only contain letters and be between 2 and 15 characters long";
    }
    if (!values.billingLastName.trim()) {
      newErrors.billingLastName = "Last Name Is required";
    } else if (!/^[A-Za-z]{2,15}$/.test(values.billingLastName)) {
      newErrors.billingLastName ="Last name  must only contain letters and be between 2 and 15 characters long";
    }
    if (!values.streetAdresse.trim()) {
      newErrors.streetAdresse = "Street Adresse Is required";
    } else if (!/^[A-Za-z0-9 ,.#'\\-]{3,100}$/.test(values.streetAdresse)) {
      newErrors.streetAdresse ="Last name  must only contain letters and be between 2 and 15 characters long";
    }

   
    

    
    

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0){
      console.log('yes')
    }

  }
  console.log("err",errors)
  return (
    <div className="checkoutpage">
      <CheckoutForm auth={auth} values={values} setValues={setValues} errors={errors} setErrors={setErrors} />
      <CheckoutOerderSummury items={items} values={values} handleGoToshipform={handleGoToshipform} />
    </div>
  );
}

function CheckoutForm({ auth , values , setValues,errors , setErrors }) {
  
  
  const inputs1 = [
    {
      id: 1,
      name: "billingEmail",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "zipCode",
      type: "text",
      placeholder: "Zip Code",
      errorMessage: "It should be a valid ZipCode!",
      label: "Zip Code",
      pattern: "[0-9]{5}",
      required: true,
    },
    {
      id: 3,
      name: "billingphoneNumber",
      type: "text",
      placeholder: "Phone Number",
      errorMessage: "It should be a valid Phone Number!",
      label: "Phone Number",
      pattern: "[0-9]{9,11}",
      required: true,
    },
  ];
  const selectinputs = [
    {
      id: 1,
      name: "billingRegion",
      errorMessage: "",
      label: "Region",
      options: [
        "Tanger-Tétouan-Al Hoceïma",
        "Souss-Massa",
        "Guelmim-Oued Noun[A]",
        "Laâyoune-Sakia El Hamra[A]",
      ],
    },
    {
      id: 1,
      name: "city",
      errorMessage: "",
      label: "City",
      options: ["Tanger", "Agidir", "Guelmim", "Laâyoune"],
    },
  ];
  const inputs2 = [
    {
      id: 1,
      name: "billingFirstName",
      type: "text",
      placeholder: "Your first name",
      errorMessage:
        "First name  must only contain letters and be between 2 and 15 characters long",
      label: "First name",
      pattern: "^[A-Za-z]{2,15}$",
      required: true,
    },
    {
      id: 2,
      name: "billingLastName",
      type: "text",
      placeholder: "Your Last Name",
      errorMessage:
        "The Last name must only contain letters and be between 2 and 15 characters long",
      label: "Last Name",
      pattern: "^[A-Za-z]{2,15}$",
      required: true,
    },
    {
      id: 3,
      name: "companyName",
      type: "text",
      placeholder: "Company name",
      errorMessage: "It should be a valid Last Name",
      label: "Company Name (optional)",
      required: false,
    },
  ];

  const streeadinput = {
    id: 4,
    name: "streetAdresse",
    type: "text",
    placeholder: "Your Street Adresse",
    errorMessage:
      "Enter a valid street address (letters, numbers, and common symbols only).",
    label: "Street Adresse",
    pattern: "^[A-Za-z0-9 ,.#'\\-]{3,100}$",
    required: true,
  };

  // to do 
// add word count 
// add red border in cas of err

  const onChange = (e) => {
    const maxWords = 10;
    const { name, value, type, checked } = e.target;
    if (name === "OrderNotes" && value.trim().split(/\s+/).length >= maxWords) {
      setErrors((prev) => ({
        ...prev,
        OrderNotes: "Max words allowed are 50",
      }));
    } else {
      setValues({ ...values, [name]: type === "checkbox" ? checked : value });
    }

     if (errors[name]) {
     
      const updatedErrors = { ...errors }; 
      
      delete updatedErrors[name];         
      setErrors(updatedErrors);           
    }

  };

  return (
    <div className="checkoutform">
      <p className="checkoutformp">Billing Information</p>
      <div className="checkoutforminputbox">
        {inputs2.map((input) => (
          <BillingInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
            err={errors[input.name]}
          />
        ))}
      </div>
      <BillingInput
        {...streeadinput}
        value={values[streeadinput.name]}
        onChange={onChange}
        err={errors[streeadinput.name]}
      />
      <div className="checkoutforminputbox">
        {selectinputs.map((input, i) => (
          <BillingSelectInput
            key={input.id + i}
            {...input}
            onChange={onChange}
            value={values[input.name]}
            errorMessage={errors[input.name]}
          />
        ))}
        <BillingInput
          {...inputs1[1]}
          value={values[inputs1[1].name]}
          onChange={onChange}
          err={errors[inputs1[1].name]}

        />
      </div>
      <div className="checkoutforminputbox">
        <BillingInput
          {...inputs1[0]}
          value={values[inputs1[0].name]}
          onChange={onChange}
          err={errors[inputs1[0].name]}
        />
        <BillingInput
          {...inputs1[2]}
          value={values[inputs1[2].name]}
          onChange={onChange}
          err={errors[inputs1[2].name]}
        />
      </div>
      <label className="shiptodifadd">
        <input
          type="checkbox"
          name="shiptodiffaddress"
          checked={values.shiptodiffaddress}
          onChange={onChange}
        />
        Ship to a different address
      </label>

      <hr />

      <p className="checkoutformp">Additional Info</p>

      <div>
        <label className="ordertextlabelarea">Order Notes (Optional)</label>
        <textarea
          className="ordertextarea"
          name="OrderNotes"
          placeholder="Notes about your order, e.g. special notes for delivery"
          value={values.OrderNotes}
          onChange={onChange}
        />
        <p className="ordertextareaerr">{errors.OrderNotes}</p>
      </div>
    </div>
  );
}

function CheckoutOerderSummury({ items , values ,handleGoToshipform }) {
  const total = items.reduce((total, item) => total + item.price * item.qnt, 0);

  return (
    <div className="CheckoutOerderSummury">
      <p className="checkoutformp">Order Summery</p>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
      <div className="checkoutsubbox">
        <p>Subtotal:</p>
        <p>${total}</p>
      </div>
      <hr />
      <div className="checkoutsubbox">
        <p>Shipping:</p>
        <p>${total}</p>
      </div>
      <hr />
      <div className="checkoutsubbox">
        <p>Total:</p>
        <p>${total}</p>
      </div>

      <p className="checkoutformp">Payment Method</p>
      <label
        className="containere"
        style={{
          marginTop: ".5rem",
          cursor: "pointer",
        }}
      >
        Cash on Delivery
        <input type="checkbox" defaultChecked />
        <span className="checkmark"></span>
      </label>

      {values.shiptodiffaddress? <button onClick={handleGoToshipform}>Fill Shiping Form</button> :<button>Place Order</button>}
    </div>
  );
}

function Item({ item }) {
  return (
    <div className="checkoutItem">
      <div className="ckeckoutimgboxs">
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}${item.image}`}
          alt="product"
        />
        <p>
          {item.name} x{item.qnt}
        </p>
      </div>
      <p className="pqntcheckout">${item.qnt * item.price}</p>
    </div>
  );
}
