import { createRoot } from 'react-dom/client'
import { router } from './router/Router'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <RouterProvider router={router} />,
  // </StrictMode>,
)
