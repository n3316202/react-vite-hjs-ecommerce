import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../ui/layouts/MainLayout'
import Products from '../ui/components/fruits/Products';
import Cart from '../ui/components/fruits/Cart';
import Hero from '../ui/components/Hero';
import Login from '../ui/components/login/Login';


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
        path: 'cart', // /cart => Cart
        element: <Cart />,
        loader: () => '카트',
      },
      {
        path: 'login', // /cart => Cart
        element: <div><Hero/><Login /></div>,
        loader: () => '로그인',
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export { router, routes };
