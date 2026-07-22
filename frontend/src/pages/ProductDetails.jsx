import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../api/axios'
import './ProductDetails.css'

function ProductDetails(){
    const { id } = useParams()
    const [ product, setProduct ] = useState(null)
    useEffect(()=>{
        const fetchProduct=async()=>{
            
            const response =await api.get(`/api/products/${id}`)
           
            setProduct(response.data)
        }
        fetchProduct()
    },[id])

    if(!product){
        return <h1>Loading .......</h1>
    }

    return (
        <div className='product-details'>
            <h2>Title : {product.title}</h2>
            <p>price : {product.price}</p>
            <p>category : {product.category}</p>
            <p>Description : {product.description}</p>
            <p>Condition : {product.condition}</p>
            <p>seller : {product.seller}</p>

            <Link to={`/edit-product/${id}`}>Edit Product</Link>
        </div>
    )
}

export default ProductDetails