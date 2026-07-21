import { useState, useEffect } from "react"
import api from '../api/axios'

function Home(){
    
    const [products,setProducts] = useState([])

    useEffect(()=>{
        const fetchProducts=async ()=>{
            
            const response = await api.get("/api/products");

            console.log("Response:", response);
            console.log("Data:", response.data.products);

            setProducts(response.data.products);
        
        }

        fetchProducts()
    },[])   

    console.log(products)
    return (
        <>
            <h1>Retro-Tech</h1>
            {
                products.map((product)=>(
                    <div key={product.id}>
                        <h2>{product.title}</h2>
                        <p>{product.price}</p>
                    </div>
                ))
            }
        </>
    )

}

export default Home