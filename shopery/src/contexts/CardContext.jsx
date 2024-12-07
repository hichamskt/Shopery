import React, { createContext, useContext, useState } from "react";

const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const [showCard, setShowCard] = useState(false);
  const [items , setItems ] = useState([]);
  

  return (
    <CardContext.Provider value={{ showCard, setShowCard, items , setItems }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCardContext = () => useContext(CardContext);