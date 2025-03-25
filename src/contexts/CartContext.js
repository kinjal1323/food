import React, { createContext, useContext, useState } from "react";

const CartContext = createContext(); //used to store and share cart-related data

export const CartProvider = ({ children }) => {//wraps the entire app, provides the cart state
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});

  const addToCart = (item) => {
    const newCart = [...cart, item];
    setCart(newCart);
    setQuantities((prev) => ({
      ...prev,
      [item.id]: prev[item.id] ? prev[item.id] + 1 : 1,
    }));
    /*prev = { 101: 2 }; // We already have item 101 in the cart
      item.id = 202;

      setQuantities((prev) => ({
      ...prev,
      [202]: prev[202] ? prev[202] + 1 : 1
      })); 
    */
};

  const removeFromCart = (itemId) => {
    const newCart = cart.filter((item,index) => `${item.id}-${index}` !== itemId);
    setCart(newCart);//keeps only those that don't match itemId

    setQuantities((prev) => {
      const newQuantities = { ...prev };
      delete newQuantities[itemId];
      return newQuantities;
    });
  };
 
  const updateQuantity = (itemId, quantity) => {
    setQuantities((prev) => ({ ...prev, [itemId]: quantity }));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, quantities, updateQuantity }}>
      {children}
    </CartContext.Provider>//accessible to all components inside it.
  );
};

export const useCart = () => useContext(CartContext);
