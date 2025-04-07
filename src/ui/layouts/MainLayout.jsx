import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/Header';

import '/src/assets/fruits/lib/lightbox/css/lightbox.min.css'
import '/src/assets/fruits/lib/owlcarousel/assets/owl.carousel.min.css'
import '/src/assets/fruits/css/bootstrap.min.css'
import '/src/assets/fruits/css/style.css'

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
