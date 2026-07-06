import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Products from './pages/Products'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ScrollToTop from './utils/ScrollToTop'
import Navbar from './components/shared/Navbar'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import { Toaster } from 'react-hot-toast'
import LogInPage from './pages/LogInPage'
import PrivateRoute from './components/shared/PrivateRoute'
import RegisterPage from './pages/RegisterPage'
import CheckoutPage from './pages/CheckoutPage'
import { useSelector } from 'react-redux'
import OrderPlacedPage from './pages/orderPlacedPage'
import AdminPanel from './pages/AdminPanel'
import Dashboard from './components/admin/dashboard/Dashboard'
import AdminProducts from './components/admin/AdminProducts'
import Sellers from './components/admin/Sellers'
import Category from './components/admin/Category'

function App() {

  const cart = useSelector((state)=>state.cart.cart);

  return (
      <React.Fragment>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={ <HomePage />}/>
          <Route path='/products' element={ <Products />}/>
          <Route path='/about' element={ <About />}/>
          <Route path='/contact' element={ <Contact />}/>
          <Route path='/cart' element={ <Cart />}/>
          <Route path='/order-confirmation' element={<OrderPlacedPage/>}/>


          <Route path='/' element={<PrivateRoute />}>
            <Route path='/checkout' element={ cart.length > 0 ? <CheckoutPage />: <Navigate to='/cart' replace/>}/>
          </Route> 

          <Route path='/' element={<PrivateRoute adminOnly/>}>
              <Route path='/admin' element={ <AdminPanel />}>
              <Route path='' element={<Dashboard />} />
              <Route path='products' element={<AdminProducts />} />
              <Route path='sellers' element={<Sellers />} />
              <Route path='categories' element={<Category />} />
              </Route>
          </Route>

          <Route path='/' element={<PrivateRoute publicPage />}>
            <Route path='/login' element={ <LogInPage />}/>
            <Route path='/register' element={ <RegisterPage />}/>
          </Route>

        </Routes>
      </Router>
      <Toaster position='bottom-center'/>
    </React.Fragment>
  )
}

export default App
