import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/home.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import './App.css'

function App() {
  

  return (
   
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products/:id' element={<ProductDetails/>}/>
      </Routes>
    </BrowserRouter>
   
  )
}

export default App
