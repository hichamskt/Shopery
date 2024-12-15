import React, { useState } from 'react'
import '../BillingInput/BillingInput.css'

function BillingInput(props) {
 const [focused, setFocused] = useState(false);
  const {  errorMessage,err, onChange, label, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };
 
  return (
    <div className="BillingInputbox">
    <p>{label}</p>
    <input
      {...inputProps}
      onChange={onChange}
      onBlur={handleFocus}
      onFocus={() =>
        inputProps.name === "confirmPassword" && setFocused(true)
      }
      focused={focused.toString() }
      style={{
        borderColor:err? "red" :""
      }}
    />
    {err ? ( <span className="registererr">{err}</span>):
        (<span className="registerwarning">{errorMessage}</span>)}
  </div>
  )
}

export default BillingInput