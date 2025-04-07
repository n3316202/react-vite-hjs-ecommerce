import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../ui/layouts/MainLayout'
import Login from '../components/login/Login'


const routes = [
  {
    path: '/',
    element: <MainLayout />,
    loader: () => '로또',
    children: [
      {
        path: '',
        element: <Login />,
        loader: () => '로또',
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export { router, routes };
