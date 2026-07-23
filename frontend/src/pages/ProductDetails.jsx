import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom' 
import { useState, useEffect } from 'react'
import api from '../api/axios'
import './ProductDetails.css'

function ProductDetails(){
    const navigate=useNavigate()
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

    const handleDelete=async ()=>{
        const confirmed = window.confirm("Are you sure you want to delete this product ?")
        if(!confirmed)
            return
        try{
            await api.delete(`/api/products/${id}`)
            alert("✅ successfully deleted the product")
            navigate('/')
        }catch(err){
            console.error(err)
            alert("❌ Failed to delete the product. try again!")
        }
    }

    return (
        <div className='product-details'>
            <h2>Title : {product.title}</h2>
            <p>price : {product.price}</p>
            <p>category : {product.category}</p>
            <p>Description : {product.description}</p>
            <p>Condition : {product.condition}</p>
            <p>seller : {product.seller}</p>

            <div className="actions">
                <Link className='edit-btn' to={`/edit-product/${id}`}>Edit Product</Link>
                <button className='delete-btn' onClick={handleDelete}>Delete Product</button>
            </div>
        </div>
    )
}

export default ProductDetails