import React, { useEffect } from 'react'
import '../Toast/toast.css'
import checked from "../../assets/checkmark.gif"

function Toast({message,duration,onClose}) {


    useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);
    return () => clearTimeout(timer); 
  }, [duration, onClose]);
  return (
    <div className='toastBox'>
        <img src={checked} alt='gifimgchecked'/>
        <p>{message}</p>
    </div>
  )
}

export default Toast