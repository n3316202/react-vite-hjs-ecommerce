import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { getCarts } from "../api/CartApi";

//https://chatgpt.com/c/67ef7abf-2fbc-8007-be16-ed6e3f036f00

// 🏗️ 1. Django API 준비 (예시)
// 장바구니 API는 보통 아래처럼 구성해요:

// 메서드	경로	설명
// GET	/api/cart/	장바구니 불러오기
// POST	/api/cart/	장바구니에 상품 추가
// DELETE	/api/cart/:id/	장바구니 항목 제거

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // 장바구니 불러오기
  const loadCart = async () => {
    try {
      const response = await getCarts()
      setCartItems(response.data);
      console.log(response)
    } catch (error) {
      console.error("❌ 장바구니 불러오기 실패", error);
    }
  };

  // 장바구니에 추가
  const addToCart = async (product) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/cart/", {
        product_id: product.id,
        quantity: 1,
      });
      loadCart(); // 추가 후 다시 불러오기
    } catch (error) {
      console.error("❌ 장바구니 추가 실패", error);
    }
  };

  // 장바구니에서 제거
  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/cart/${itemId}/`);
      loadCart();
    } catch (error) {
      console.error("❌ 삭제 실패", error);
    }
  };

  const getTotalQuantity = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    loadCart();
  }, []);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    loadCart,
    getTotalQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};