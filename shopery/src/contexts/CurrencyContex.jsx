import React, { createContext, useContext, useState } from "react";





const CurrencyContex = createContext();

export const CurrencyProvider = ({ children }) => { 
  const [currency , setcurrency ] = useState(localStorage.getItem('currency') || "MAD");
  const [rate , setRate ] = useState(localStorage.getItem('rate') || 1);

  return (
    <CurrencyContex.Provider value={{ currency , setcurrency , rate , setRate }}>
      {children}
    </CurrencyContex.Provider>
  );
};

export const useCurrencyContex = () => useContext(CurrencyContex);