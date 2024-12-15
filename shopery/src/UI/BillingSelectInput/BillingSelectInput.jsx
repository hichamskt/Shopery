import React, { useEffect, useState } from 'react'
import '../BillingSelectInput/BillingSelectInput.css'



function BillingSelectInput(props) {

    const { errorMessage, onChange, label , value , options , name} = props;
    const [err,seterr]= useState(errorMessage);
    const  handleBlur=()=>{

        if(value){
            seterr("")
        }else{
            seterr("this field is required!")
        }
      }
      useEffect(()=>{
        seterr(errorMessage);
      },[errorMessage])
      
  
  
return (
    <div className="select-containerr">
    <label htmlFor="options" className="select-labell">{label} :</label>
    <select
      id="options"
      value={value}
      onChange={onChange}
      className="styled-selectt"
      name={name}
      style={{
        borderColor:errorMessage? 'red' : err?"#ff8a00":""
      }}
      onMouseLeave={handleBlur}
    >
      <option value="" disabled>Select</option>
      {options.map((option, index) => (
        <option key={index} value={option.toLowerCase().replace(" ", "")}>
          {option}
        </option>
      ))}
    </select>
    {err && <p style={{
       color: errorMessage? "#ea4b48" : ""
    }}>{err}</p>}
  </div>

);



}

export default BillingSelectInput