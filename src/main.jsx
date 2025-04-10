import { createRoot } from 'react-dom/client'
import { router } from './router/Router'
import { RouterProvider } from 'react-router-dom'
import { CartProvider } from './contexts/CartContext'


createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <CartProvider>
    <RouterProvider router={router} />,
  </CartProvider>
  // </StrictMode>,
)
