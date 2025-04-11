import http from './HttpCommon'

//http://127.0.0.1:8000/api/payments/
// 결제 후 주문 저장
export const createPayment = (shippingData, imp_uid, paid_amount) => {
  return http.post('/api/payments/', {
    shippingData: shippingData,
    imp_uid: imp_uid,
    paid_amount: paid_amount,
  })
}
