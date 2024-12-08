import React, { useState } from "react";
import "../Registerinput/Registerinput.css";

function Registerinput(props) {
  const [focused, setFocused] = useState(false);
  const { errorMessage,err, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  
console.log(err,"hada errr" )
  return (
    <div className="registerinputbox">
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
      />
      {err?  <span>{err}</span>:
        <span>{errorMessage}</span>}
    </div>
  );
}

export default Registerinput;
