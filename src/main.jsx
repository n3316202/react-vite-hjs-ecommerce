import { createRoot } from 'react-dom/client'
import { router } from './router/Router'
import { RouterProvider } from 'react-router-dom'
import { CartProvider } from './contexts/CartContext'
import { AuthProvider } from './contexts/AuthContext'
//dev_5
createRoot(document.getElementById('root')).render(
  //dev_26 카트와 순서 바꿈
  <CartProvider>
    <AuthProvider>
        <RouterProvider router={router} />,
    </AuthProvider>
  </CartProvider>
)
