import React from 'react'

const RequestPay = (orderData) => {
  IMP.init("imp00000000"); // 아임포트 가맹점 식별코드로 교체

  const data = {
    pg: "html5_inicis", // 결제 PG사
    pay_method: "card", // 결제수단
    merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
    name: orderData.name,
    amount: orderData.amount,
    buyer_email: orderData.email,
    buyer_name: orderData.username,
    buyer_tel: orderData.phone,
    buyer_addr: orderData.address,
    buyer_postcode: orderData.postcode,
  };

  IMP.request_pay(data, async (rsp) => {
    if (rsp.success) {
      console.log("✅ 결제 성공", rsp);

      // 👉 백엔드로 결제 검증 및 주문 저장 요청
      try {
        const res = await axios.post("/api/orders/", {
          imp_uid: rsp.imp_uid,
          merchant_uid: rsp.merchant_uid,
          amount: rsp.paid_amount,
        });
        alert("결제 및 주문이 성공적으로 완료되었습니다!");
      } catch (error) {
        console.error("❌ 주문 저장 실패", error);
        alert("결제는 성공했지만 주문 저장에 실패했습니다.");
      }
    } else {
      alert(`결제 실패: ${rsp.error_msg}`);
    }
  });

  return (
    

  )
}

export default RequestPay

