import { createBrowserRouter } from 'react-router-dom'
import MainPage from '../ui/pages/MainPage'


const routes = [
  {
    path: '/',
    element: <MainPage />,
    loader: () => '로또',
  },
]

const router = createBrowserRouter(routes)

export { router, routes }
