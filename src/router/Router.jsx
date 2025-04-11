import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../ui/layouts/MainLayout'
import Products from '../ui/components/fruits/Products';
import Cart from '../ui/components/fruits/Cart';
import Hero from '../ui/components/Hero';
import Login from '../ui/components/login/Login';
import CheckOut from '../ui/components/payment/CheckOut';


const routes = [
  {
    path: '/',
    element: <MainLayout />,
    loader: () => '메인 레이아웃',
    children: [
      {
        path: '', // 기본 경로: / => Products
        element: <div><Hero/><Products /></div>,
        loader: () => '상품들',
      },
      {
        path: 'cart', //
        element: <Cart />,
        loader: () => '카트',
      },
      {
        path: 'login', // 
        element: <div><Hero/><Login /></div>,
        loader: () => '로그인',
      },
      {
        path: 'checkout', //dev_7
        element: <div><CheckOut /></div>,
        loader: () => '로그인',
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export { router, routes };
