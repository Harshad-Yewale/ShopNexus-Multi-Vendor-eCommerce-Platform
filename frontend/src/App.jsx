import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Products from './pages/Products'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ScrollToTop from './utils/ScrollToTop'
import Navbar from './components/shared/Navbar'
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
  const [count, setCount] = useState(0)

  return (
     <Router>
      <ScrollToTop/>
      <Navbar/>
      <Routes>
        <Route path='/' element={ <HomePage />}/>
        <Route path='/products' element={ <Products />}/>
        <Route path='/about' element={ <About />}/>
        <Route path='/contact' element={ <Contact />}/>
      </Routes>
    </Router>
  )
}

export default App
