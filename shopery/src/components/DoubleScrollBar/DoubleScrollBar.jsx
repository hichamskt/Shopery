import React, { useState ,useEffect, useRef} from 'react'
import './DoubleScrollBar.css';

export const DoubleScrollBar = ({min,max,step,className,onChange}) => {
    const [inputFrom,setInputFrom ] = useState(min);
    const [inputTo,setInputTo ] = useState(max);
    const sliderRef = useRef(null);

    useEffect(() => {
        if (sliderRef.current===null) return;
        if (inputFrom>inputTo){
            sliderRef.current.style.right = `${100-(inputFrom-min)/(max-min)*100}%`;
            sliderRef.current.style.left = `${(inputTo-min)/(max-min)*100}%`;
        }else{
            sliderRef.current.style.right = `${100-(inputTo-min)/(max-min)*100}%`;
            sliderRef.current.style.left = `${(inputFrom-min)/(max-min)*100}%`;
        }

        if (onChange){ 
            if(inputFrom>inputTo){
                onChange(inputTo,inputFrom);

            }else{

                onChange(inputFrom,inputTo);
            }
        }
        
    }, [inputFrom,inputTo,min,max ,onChange])
    

  return (
    <div className={`${className}`}>
        <div className="range-slider">
            <span className="range-selected" ref={sliderRef}></span>
        </div>
        <div className="range-input">
            <input type="range" 
            onChange={(e)=>setInputFrom(parseFloat(e.target.value))}
            min={min}
            max={max}
            step={step}
            defaultValue={min}/>
            <input type="range"
            onChange={(e)=>setInputTo(parseFloat(e.target.value))}
            min={min}
            max={max}
            step={step}
             defaultValue={max}/>
        </div>
    </div>
  )
}