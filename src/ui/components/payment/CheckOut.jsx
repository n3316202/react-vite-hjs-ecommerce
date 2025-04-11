import React, { useState } from 'react'
import { useCart } from '../../../contexts/CartContext'
import { formatCurrency } from '../../../utils/format'

const CheckOut = () => {
  const [shippingData, setShippingData] = useState({
    full_name: '',
    address1: '',
    city: '',
    country: '',
    zipcode: '',
    phone: '',
    email: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    //✅ [name]: value는?
    // 동적 키 설정입니다.
    // name이라는 변수에 들어있는 값이 키 이름이 됩니다.
    // 예를 들어 name = "address" 라면, { [name]: value }는 { address: value }와 같습니다.
    // const name = "city";
    // const value = "서울";
    // const obj = { [name]: value }; // { city: "서울" }
    /////////////////////////////////////////////////////////////
    //prev = { address: "서울", city: "부산" }
    // name = "city"
    // value = "대구"
    // => 결과: { address: "서울", city: "대구" }
    setShippingData((prev) => ({ ...prev, [name]: value }))
  }

  //카트 가져오기
  //   {
  //     "cart": [
  //         {
  //             "product": {
  //                 "id": 34,
  //                 "name": "너를위한-스프링",
  //                 "price": "10000.00",
  //                 "description": "자바 책입니다.",
  //                 "image": "/media/upload/product/%EC%8A%A4%ED%94%84%EB%A7%81.jpg",
  //                 "is_sale": false,
  //                 "sale_price": 0,
  //                 "category": {
  //                     "id": 4,
  //                     "name": "도서"
  //                 }
  //             },
  //             "quantity": 1,
  //             "price": "10000.00",
  //             "total_price": "10000.00"
  //         },
  //         {
  //             "product": {
  //                 "id": 33,
  //                 "name": "너를위한-장고",
  //                 "price": "12000.00",
  //                 "description": "파이썬 책입니다.",
  //                 "image": "/media/upload/product/%EC%9E%A5%EA%B3%A0%EB%B6%80%ED%83%81_l4SgUHx.jpg",
  //                 "is_sale": false,
  //                 "sale_price": 0,
  //                 "category": {
  //                     "id": 1,
  //                     "name": "파이썬"
  //                 }
  //             },
  //             "quantity": 1,
  //             "price": "12000.00",
  //             "total_price": "12000.00"
  //         }
  //     ],
  //     "cart_total_items": 2,
  //     "cart_total_price": "22000.00"
  // }
  const { cartItems, addToCart, removeFromCart } = useCart()
  console.log('cartItems 👉', cartItems)
  console.log(cartItems)

  return (
    <>
      <div className='container-fluid page-header py-5'>
        <h1 className='text-center text-white display-6'>Checkout</h1>
        <ol className='breadcrumb justify-content-center mb-0'>
          <li className='breadcrumb-item'>
            <a href='#'>Home</a>
          </li>
          <li className='breadcrumb-item'>
            <a href='#'>Pages</a>
          </li>
          <li className='breadcrumb-item active text-white'>Checkout</li>
        </ol>
      </div>
      <div className='container-fluid py-5'>
        <div className='container py-5'>
          <h1 className='mb-4'>Billing details</h1>
          <form action='#'>
            <div className='row g-5'>
              <div className='col-md-12 col-lg-6 col-xl-7'>
                <div className='row'>
                  <div className='col-md-12 col-lg-12'>
                    <div className='form-item w-100'>
                      <label className='form-label my-3'>
                        이름<sup>*</sup>
                      </label>
                      <input type='text' name='full_name' onChange={handleChange} className='form-control' />
                    </div>
                  </div>
                </div>
                <div className='form-item'>
                  <label className='form-label my-3'>
                    Address<sup>*</sup>
                  </label>
                  <input type='text' name='address1' onChange={handleChange} className='form-control' />
                </div>
                <div className='form-item'>
                  <label className='form-label my-3'>
                    Town/City<sup>*</sup>
                  </label>
                  <input type='text' name='city' onChange={handleChange} className='form-control' />
                </div>
                <div className='form-item'>
                  <label className='form-label my-3'>
                    Country<sup>*</sup>
                  </label>
                  <input type='text' name='country' onChange={handleChange} className='form-control' />
                </div>
                <div className='form-item'>
                  <label className='form-label my-3'>
                    Postcode/Zip<sup>*</sup>
                  </label>
                  <input type='text' name='zipcode' onChange={handleChange} className='form-control' />
                </div>
                <div className='form-item'>
                  <label className='form-label my-3'>
                    Mobile<sup>*</sup>
                  </label>
                  <input type='tel' name='phone' onChange={handleChange} className='form-control' />
                </div>
                <div className='form-item'>
                  <label className='form-label my-3'>
                    Email Address<sup>*</sup>
                  </label>
                  <input type='email' name='email' onChange={handleChange} className='form-control' />
                </div>
                <div className='form-check my-3'>
                  <input
                    type='checkbox'
                    className='form-check-input'
                    id='Account-1'
                    name='Accounts'
                    defaultValue='Accounts'
                  />
                  <label className='form-check-label' htmlFor='Account-1'>
                    Create an account?
                  </label>
                </div>
                <hr />
                <div className='form-check my-3'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    id='Address-1'
                    name='Address'
                    defaultValue='Address'
                  />
                  <label className='form-check-label' htmlFor='Address-1'>
                    Ship to a different address?
                  </label>
                </div>
                <div className='form-item'>
                  <textarea
                    name='text'
                    className='form-control'
                    spellCheck='false'
                    cols={30}
                    rows={11}
                    placeholder='Oreder Notes (Optional)'
                    defaultValue={'문앞에 놔 주세요.'}
                  />
                </div>
              </div>
              <div className='col-md-12 col-lg-6 col-xl-5'>
                <div className='table-responsive'>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th scope='col'>Products</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Price</th>
                        <th scope='col'>Quantity</th>
                        <th scope='col'>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems &&
                        cartItems?.cart?.map((item, index) => (
                          <tr key={index}>
                            <th scope='row'>
                              <div className='d-flex align-items-center mt-2'>
                                <img
                                  src={`http://127.0.0.1:8000/${item.product.image}`}
                                  className='img-fluid rounded-circle'
                                  style={{ width: 90, height: 90 }}
                                  alt=''
                                />
                              </div>
                            </th>
                            <td className='py-5'>{item.product.name}</td>
                            <td className='py-5'>{formatCurrency(item.product.price)}</td>
                            <td className='py-5'>{item.quantity}</td>
                            <td className='py-5'>{formatCurrency(item.total_price)}</td>
                          </tr>
                        ))}

                      <tr>
                        <th scope='row'></th>
                        <td className='py-5' />
                        <td className='py-5' />
                        <td className='py-5'>
                          <p className='mb-0 text-dark py-3'>Subtotal</p>
                        </td>
                        <td className='py-5'>
                          <div className='py-3 border-bottom border-top'>
                            <p className='mb-0 text-dark'>{formatCurrency(cartItems.cart_total_price)}</p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope='row'></th>
                        <td className='py-5'>
                          <p className='mb-0 text-dark py-4'>Shipping</p>
                        </td>
                        <td colSpan={3} className='py-5'>
                          <div className='form-check text-start'>
                            <input
                              type='checkbox'
                              className='form-check-input bg-primary border-0'
                              id='Shipping-1'
                              name='Shipping-1'
                              defaultValue='Shipping'
                            />
                            <label className='form-check-label' htmlFor='Shipping-1'>
                              Free Shipping
                            </label>
                          </div>
                          <div className='form-check text-start'>
                            <input
                              type='checkbox'
                              className='form-check-input bg-primary border-0'
                              id='Shipping-2'
                              name='Shipping-1'
                              defaultValue='Shipping'
                            />
                            <label className='form-check-label' htmlFor='Shipping-2'>
                              Flat rate: $15.00
                            </label>
                          </div>
                          <div className='form-check text-start'>
                            <input
                              type='checkbox'
                              className='form-check-input bg-primary border-0'
                              id='Shipping-3'
                              name='Shipping-1'
                              defaultValue='Shipping'
                            />
                            <label className='form-check-label' htmlFor='Shipping-3'>
                              Local Pickup: $8.00
                            </label>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope='row'></th>
                        <td className='py-5'>
                          <p className='mb-0 text-dark text-uppercase py-3'>TOTAL</p>
                        </td>
                        <td className='py-5' />
                        <td className='py-5' />
                        <td className='py-5'>
                          <div className='py-3 border-bottom border-top'>
                            <p className='mb-0 text-dark'>{formatCurrency(cartItems.cart_total_price)}</p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className='row g-4 text-center align-items-center justify-content-center border-bottom py-3'>
                  <div className='col-12'>
                    <div className='form-check text-start my-3'>
                      <input
                        type='checkbox'
                        className='form-check-input bg-primary border-0'
                        id='Transfer-1'
                        name='Transfer'
                        defaultValue='Transfer'
                      />
                      <label className='form-check-label' htmlFor='Transfer-1'>
                        Direct Bank Transfer
                      </label>
                    </div>
                    <p className='text-start text-dark'>
                      Make your payment directly into our bank account. Please use your Order ID as the payment
                      reference. Your order will not be shipped until the funds have cleared in our account.
                    </p>
                  </div>
                </div>
                <div className='row g-4 text-center align-items-center justify-content-center border-bottom py-3'>
                  <div className='col-12'>
                    <div className='form-check text-start my-3'>
                      <input
                        type='checkbox'
                        className='form-check-input bg-primary border-0'
                        id='Payments-1'
                        name='Payments'
                        defaultValue='Payments'
                      />
                      <label className='form-check-label' htmlFor='Payments-1'>
                        Check Payments
                      </label>
                    </div>
                  </div>
                </div>
                <div className='row g-4 text-center align-items-center justify-content-center border-bottom py-3'>
                  <div className='col-12'>
                    <div className='form-check text-start my-3'>
                      <input
                        type='checkbox'
                        className='form-check-input bg-primary border-0'
                        id='Delivery-1'
                        name='Delivery'
                        defaultValue='Delivery'
                      />
                      <label className='form-check-label' htmlFor='Delivery-1'>
                        Cash On Delivery
                      </label>
                    </div>
                  </div>
                </div>
                <div className='row g-4 text-center align-items-center justify-content-center border-bottom py-3'>
                  <div className='col-12'>
                    <div className='form-check text-start my-3'>
                      <input
                        type='checkbox'
                        className='form-check-input bg-primary border-0'
                        id='Paypal-1'
                        name='Paypal'
                        defaultValue='Paypal'
                      />
                      <label className='form-check-label' htmlFor='Paypal-1'>
                        Paypal
                      </label>
                    </div>
                  </div>
                </div>
                <div className='row g-4 text-center align-items-center justify-content-center pt-4'>
                  <button type='button' className='btn border-secondary py-3 px-4 text-uppercase w-100 text-primary'>
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default CheckOut
