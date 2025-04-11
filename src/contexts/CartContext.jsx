import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { addCart, deleteCart, getCarts } from '../api/CartApi'

//https://chatgpt.com/c/67ef7abf-2fbc-8007-be16-ed6e3f036f00

// 🏗️ 1. Django API 준비 (예시)
// 장바구니 API는 보통 아래처럼 구성해요:

// 메서드	경로	설명
// GET	/api/cart/	장바구니 불러오기
// POST	/api/cart/	장바구니에 상품 추가
// DELETE	/api/cart/:id/	장바구니 항목 제거

const CartContext = createContext()
export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  // 장바구니 불러오기
  const loadCart = async () => {
    try {
      const response = await getCarts()
      setCartItems(response.data)
      console.log('컨텍스트:로드카트')
      console.log(response)
    } catch (error) {
      console.error('❌ 장바구니 불러오기 실패', error)
    }
  }

  // 장바구니에 추가
  const addToCart = async (product, qty = 1) => {
    try {
      const response = await addCart(product.id, qty)
      console.log(response)

      await loadCart() // 장바구니 갱신
      console.log('✅ 장바구니에 상품이 추가되었습니다.')
    } catch (error) {
      console.error('❌ 장바구니 추가 실패:', error.response?.data || error.message)
    }
  }

  // 장바구니에서 제거
  const removeFromCart = async (productId) => {
    try {
      await deleteCart(productId) // API 호출 (product_id를 body로 넘김)
      await loadCart() // 장바구니 다시 불러오기
      console.log('✅ 상품이 장바구니에서 제거되었습니다.')
    } catch (error) {
      console.error('❌ 삭제 실패', error.response?.data || error.message)
    }
  }

  const getTotalQuantity = () => {
    cartItems.reduce((total, item) => total + item.quantity, 0)
    console.log(cartItems)
  }

  useEffect(() => {
    loadCart()
  }, [])

  //dev_6
  const clearCart = () => {
    setCartItems([])
  }

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    loadCart,
    getTotalQuantity,
    clearCart, //dev_6
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
