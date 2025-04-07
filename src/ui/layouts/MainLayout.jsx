import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='vh-100 d-flex flex-column justify-content-between'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default MainLayout
