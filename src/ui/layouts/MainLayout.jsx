import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer'

import $ from 'jquery';
window.$ = $;
window.jQuery = $; // optional if needed globally

//import '/src/assets/fruits/js/main.js'
// import '/src/assets/fruits/lib/easing/easing.min.js'
// import '/src/assets/fruits/lib/waypoints/waypoints.min.js'
// import '/src/assets/fruits/lib/lightbox/js/lightbox.min.js'
// import '/src/assets/fruits/lib/owlcarousel/owl.carousel.min.js'

import '/src/assets/fruits/lib/lightbox/css/lightbox.min.css'
import '/src/assets/fruits/lib/owlcarousel/assets/owl.carousel.min.css'
import '/src/assets/fruits/css/bootstrap.min.css'
import '/src/assets/fruits/css/style.css'
import Header from '../../components/Header';

const MainLayout = () => {
  return (
    <div className='vh-100 d-flex flex-column justify-content-between'>
      <Header />
      {/* <Outlet /> */}
      <Footer />
    </div>
  )
}

export default MainLayout
