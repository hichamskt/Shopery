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
          <CheckoutPage auth={auth} />
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

function CheckoutPage({ auth }) {
  return (
    <div className="checkoutpage">
      <CheckoutForm auth={auth} />
      <CheckoutOerderSummury />
    </div>
  );
}

function CheckoutForm({ auth }) {
  const [values, setValues] = useState({
    billingFirstName: "",
    billingLastName: "",
    companyName: "",
    streetAdresse: "",
    billingRegion:"",
    city: "",
    zipCode: "",
    billingEmail: "",
    billingphoneNumber: "",
    shiptodiffaddress: "",
  });
  const [errors, setErrors] = useState({});

  const inputs1 = [
    {
      id: 1,
      name: "email",
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
  ];
  const selectinputs = [
    {
      id: 1,
      name: "billingRegion",
      errorMessage: "",
      label: "Region",
      options:['Tanger-Tétouan-Al Hoceïma','Souss-Massa','Guelmim-Oued Noun[A]','Laâyoune-Sakia El Hamra[A]']
    },
    {
      id: 1,
      name: "city",
      errorMessage: "",
      label: "City",
      options:['Tanger','Agidir','Guelmim','Laâyoune']
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
    id:4,
    name: "streetAdresse",
    type: "text",
    placeholder: "Your Street Adresse",
    errorMessage:
      "Enter a valid street address (letters, numbers, and common symbols only).",
    label: "Street Adresse",
    pattern: "^[A-Za-z0-9 ,.#'\\-]{3,100}$",
    required: true,
  };

  console.log(values)
  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({ ...values, [name]: type === "checkbox" ? checked : value });
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
        {selectinputs.map((input,i)=>(
          
          <BillingSelectInput key={input.id+i} {...input} onChange={onChange} value={values[input.name]} />
        ))
      }
      <BillingInput
            {...inputs1[1]}
            value={values[inputs1[1].name]}
            onChange={onChange}
            err={errors[inputs1[1].name]}
            />
      </div>
    </div>

  );
}

function CheckoutOerderSummury() {
  return <div>qqq</div>;
}
