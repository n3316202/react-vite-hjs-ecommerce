import { createBrowserRouter } from 'react-router-dom'
import MainPage from '../ui/pages/MainPage'
import MainLayout from '../ui/layouts/MainLayout'


const routes = [
  {
    path: '/',
    element: <MainLayout />,
    loader: () => '메인 페이지',
  },
]

const router = createBrowserRouter(routes)

export { router, routes }
