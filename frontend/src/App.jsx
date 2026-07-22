import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/home.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import AddProduct from './pages/AddProduct.jsx'
import EditProduct from './pages/EditProduct.jsx'
import './App.css'

function App() {
  

  return (
   
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products/:id' element={<ProductDetails/>}/>
        <Route path='/add-product' element={<AddProduct/>}/>
        <Route path='/edit-product/:id' element={<EditProduct/>}/>
      </Routes>
    </BrowserRouter>
   
  )
}

export default App
