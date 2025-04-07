import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../ui/layouts/MainLayout'
import Login from '@/ui/components/login/Login'
import Products from '../ui/components/fruits/Products';


const routes = [
  {
    path: '/',
    element: <MainLayout />,
    loader: () => '로또',
    children: [
      {
        path: '',
        element: <Products />,
        loader: () => '로또',
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export { router, routes };
