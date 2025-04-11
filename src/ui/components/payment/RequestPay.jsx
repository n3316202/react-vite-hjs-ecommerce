import React from 'react'
import { createPayment } from '../../../api/PaymentApi'

const RequestPay = (shippingData, cartItems = null, pg = 'kakaopay', pay_method = 'card') => {
  const impCode = 'imp43216235' //상점번호

  // const { cartItems } = useCart() 함수에서는 컨텍스트 호출 불가

  // 💡 Promise로 래핑하여 비동기 처리를 await로 받을 수 있도록 함
  return new Promise((resolve, reject) => {
    IMP.init(impCode) // 아임포트 가맹점 식별코드로 교체

    const data = {
      pg: pg, // 결제 PG사
      pay_method: pay_method, // 결제수단
      // merchant_uid: `mid_${new Date().getTime()}`, // 생략시 자동 생성
      name: '꿈나라 쇼핑몰',
      amount: 100, // Number(cartItems.cart_total_price),
      buyer_email: shippingData.email,
      buyer_name: shippingData.full_name,
      buyer_tel: shippingData.phone,
      buyer_addr: shippingData.address1,
      buyer_postcode: shippingData.zipcode,
    }

    IMP.request_pay(data, async (rsp) => {
      if (rsp.success) {
        console.log('✅ 결제 성공', rsp)

        // 👉 백엔드로 결제 검증 및 주문 저장 요청
        try {
          const res = await createPayment(shippingData, rsp.imp_uid, rsp.paid_amount)
          console.log(res)
          alert('결제 및 주문이 성공적으로 완료되었습니다!')

          resolve(true) // ✅ 성공 시 true 반환
        } catch (error) {
          console.error('❌ 주문 저장 실패', error)
          alert('결제는 성공했지만 주문 저장에 실패했습니다.')
          reject(error) // ❌ 에러 발생 시 reject
        }
      } else {
        alert(`결제 실패: ${rsp.error_msg}`)
        reject(new Error(rsp.error_msg)) // ❌ 결제 실패 시 reject
      }
    })
  })
}

export default RequestPay