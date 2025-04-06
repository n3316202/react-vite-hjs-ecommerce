import { createBrowserRouter } from 'react-router-dom'

const routes = [
  {
    path: '/',
    element: <MainPage />,
    loader: () => '로또',
  },
]

const router = createBrowserRouter(routes)

export { router, routes }
