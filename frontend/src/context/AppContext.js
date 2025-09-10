// src/context/AppContext.js
import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Load products once
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setProducts([]);
      });
  }, []);

  // Load cart from localStorage (persistence)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("my_ecom_cart_v1");
      if (stored) setCart(JSON.parse(stored));
    } catch (e) {
      /* ignore */
    }
  }, []);

  // Save cart to localStorage when changes
  useEffect(() => {
    try {
      localStorage.setItem("my_ecom_cart_v1", JSON.stringify(cart));
    } catch (e) {
      /* ignore */
    }
  }, [cart]);

  const addToCart = (product) => {
    if (!product) return false;
    if (cart.some((p) => p.id === product.id)) return false; // already in cart
    setCart((prev) => [...prev, product]);
    return true;
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const getProductById = (id) => {
    if (id === undefined || id === null) return undefined;
    return products.find((p) => String(p.id) === String(id));
  };

  return (
    <AppContext.Provider
      value={{ products, cart, addToCart, removeFromCart, clearCart, getProductById }}
    >
      {children}
    </AppContext.Provider>
  );
};
