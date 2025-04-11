import React from 'react'

const RequestPay = (orderData, cartItems = null, pg = 'kakaopay', pay_method = 'card') => {
  let impCode = 'imp43216235' //상점번호

  //const { cartItems } = useCart() 함수에서는 컨테스트 호출 불가

  IMP.init(impCode) // 아임포트 가맹점 식별코드로 교체

  const data = {
    pg: pg, // 결제 PG사
    pay_method: pay_method, // 결제수단
    //merchant_uid: `mid_${new Date().getTime()}`, // 생략시 자동 생성
    name: '꿈나라 쇼핑몰',
    amount: 100, //Number(cartItems.cart_total_price),
    buyer_email: orderData.email,
    buyer_name: orderData.full_name,
    buyer_tel: orderData.phone,
    buyer_addr: orderData.address1,
    buyer_postcode: orderData.zipcode,
  }

  IMP.request_pay(data, async (rsp) => {
    if (rsp.success) {
      console.log('✅ 결제 성공', rsp)

      // 👉 백엔드로 결제 검증 및 주문 저장 요청
      try {
        const res = await axios.post('/api/orders/', {
          imp_uid: rsp.imp_uid,
          merchant_uid: rsp.merchant_uid,
          amount: rsp.paid_amount,
        })
        alert('결제 및 주문이 성공적으로 완료되었습니다!')
      } catch (error) {
        console.error('❌ 주문 저장 실패', error)
        alert('결제는 성공했지만 주문 저장에 실패했습니다.')
      }
    } else {
      alert(`결제 실패: ${rsp.error_msg}`)
    }
  })
}

export default RequestPay
