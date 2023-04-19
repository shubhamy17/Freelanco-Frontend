import React, { useState, createContext, useContext, useEffect } from "react";
import { getAllCategories } from "../api/category";

const context = createContext();
const { Provider } = context;

export const GigsProvider = ({ children }) => {
  const [categories, setCategories] = useState(null);

  const updateCategories = async () => {
    const all_categories = await getAllCategories();
    setCategories(all_categories[0].category);
  };

  useEffect(() => {
    updateCategories();
  }, []);

  return (
    <Provider
      value={{
        categories,
      }}
    >
      {children}
    </Provider>
  );
};

const useGigs = () => useContext(context);

export default useGigs;
