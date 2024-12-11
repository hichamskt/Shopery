import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const CardProvider = ({ children }) => {
  const [user , setUser ] = useState({});
  

  return (
    <UserContext.Provider value={{ user , setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);