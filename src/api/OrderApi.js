import http from './HttpCommon';

//http://127.0.0.1:8000/api/products/

// 결제 후 주문 저장
export const createOrder = (orderData) => {
  return http.post('/api/orders/', orderData);
};