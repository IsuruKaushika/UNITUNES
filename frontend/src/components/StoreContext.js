// src/context/StoreContext.js
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const url = "http://localhost:3000";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${url}/api/products/`);
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const contextValue = {
    products,
    setProducts,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
