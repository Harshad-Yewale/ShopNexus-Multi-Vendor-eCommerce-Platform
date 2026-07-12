import React, { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Products from './pages/Products'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
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
import Sellers from './components/admin/sellers/Sellers'
import AdminOrders from './components/admin/orders/AdminOrders'
import AdminProducts from './components/admin/products/AdminProducts'
import Category from './components/admin/category/Category'
import { setupInterceptors } from './api/api'
import MyOrdersPage from './pages/myOrdersPage'

function App() {

  const navigate = useNavigate();
  const {user} = useSelector((state)=>state.auth)
  const cart = useSelector((state)=>state.cart.cart);
  const isAdmin = user?.roles?.includes("ROLE_ADMIN");


  useEffect(() => {
        setupInterceptors(navigate);
    }, [navigate]);

  return (
      <React.Fragment>
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
             <Route path='/profile/orders' element={<MyOrdersPage />} />
          </Route> 

          <Route element={<PrivateRoute adminOnly />}>
              <Route path="/admin" element={<AdminPanel />}>
                  <Route index element={<Dashboard />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="sellers" element={<Sellers />} />
              </Route>
          </Route>

          <Route element={<PrivateRoute sellerOnly />}>
              <Route path="/seller" element={<AdminPanel />}>
                  <Route index element={<Navigate to="orders" replace />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="products" element={<AdminProducts />} />
              </Route>
          </Route>

          <Route path='/' element={<PrivateRoute publicPage />}>
            <Route path='/login' element={ <LogInPage />}/>
            <Route path='/register' element={ <RegisterPage />}/>
          </Route>

        </Routes>
      <Toaster position='bottom-center'/>
    </React.Fragment>
  )
}

export default App
