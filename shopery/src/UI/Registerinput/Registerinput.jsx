import React, { useEffect, useState } from "react";
import "../Registerinput/Registerinput.css";

function Registerinput(props) {
  const [focused, setFocused] = useState(false);
  const { errorMessage,err, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };


  

  return (
    <div className="registerinputbox">
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString() }
        
      />
      {err ? ( <span className="registererr">{err}</span>):
        (<span className="registerwarning">{errorMessage}</span>)}
    </div>
  );
}

export default Registerinput;
