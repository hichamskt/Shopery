import React, { createContext, useContext, useEffect, useState } from "react";

const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const [showCard, setShowCard] = useState(false);
  const carditems = JSON.parse(localStorage.getItem("cardItems"));
  const [items, setItems] = useState(carditems || []);

  return (
    <CardContext.Provider value={{ showCard, setShowCard, items , setItems }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCardContext = () => useContext(CardContext);