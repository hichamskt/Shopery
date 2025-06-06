import React, { useEffect, useState } from "react";
import "../ProgressTracker/ProgressTracker.css";
import { FaCheck } from "react-icons/fa";

function ProgressTracker({}) {
  const [greenPercent, setGreenPercent] = useState(0);
  const order = {
    status: "Delivered",
  };

  useEffect(() => {
    if (order.status === "pending") setGreenPercent(0);
    else if (order.status === "Processing") setGreenPercent(34);
    else if (order.status === "On the way") setGreenPercent(66);
    else if (order.status === "Delivered") setGreenPercent(99);
  }, [order]);

  const backgroundStyle = {
    background: `linear-gradient(to right, var(--primary) ${greenPercent}%, var(--gray-05) ${greenPercent}%)`,
  };
  return (
    <div className="pgtrackerbox">
      
        <div className="tracker" style={backgroundStyle}>
          <span>
            <FaCheck />
          </span>
          <span
            style={
              greenPercent > 30
                ? { color: "white", background: "var(--primary)", outline:"none" }
                : {}
            }
          >
            02
          </span>
          <span
           style={
              greenPercent > 60
                ? { color: "white", background: "var(--primary)", outline:"none" }
                : {}
            }
          >03</span>
          <span
           style={
              greenPercent > 90
                ? { color: "white", background: "var(--primary)", outline:"none" }
                : {}
            }
          >04</span>
          <div>
            Order received
          </div>
          <div 
          style={
            greenPercent>30?
            {
                color:"var(--primary)" 
            }:{}
          }
          >
            Processing
          </div>
          <div
          style={
            greenPercent>60?
            {
                color:"var(--primary)" 
            }:{}
          }
          >
            On the way
          </div>
          <div
          style={
            greenPercent>90?
            {
                color:"var(--primary)" 
            }:{}
          }>
            Delivered
          </div>
        </div>
      
    </div>
  );
}

export default ProgressTracker;
