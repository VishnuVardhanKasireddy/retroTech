import { useState, useEffect } from "react"
import api from '../api/axios'
import './home.css'
import ProductCard from '../components/ProductCard'

function Home(){
    
    const [products,setProducts] = useState([])

    useEffect(()=>{
        const fetchProducts=async ()=>{
            
            const response = await api.get("/api/products");

            setProducts(response.data.products);
        
        }

        fetchProducts()
    },[])   

    
    return (
        <>
            <h1>Retro-Tech</h1>
            <div className="products-container">
                
                {
                    products.map((product)=>(
                        <ProductCard key={product.id} product={product}/>
                    ))
                }
            </div>
        </>
    )

}

export default Home