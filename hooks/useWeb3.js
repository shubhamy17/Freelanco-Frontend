import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";

const context = createContext();
const { Provider } = context;

export const Web3Provider = ({ children }) => {
  return <Provider value={{}}>{children}</Provider>;
};

const useWeb3 = () => useContext(context);

export default useWeb3;
