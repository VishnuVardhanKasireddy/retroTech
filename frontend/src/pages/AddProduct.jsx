import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"
import './AddProduct.css'

function AddProduct(){
    const navigate=useNavigate()
    const initialProduct={
        title:"",
        price:"",
        category:"",
        condition:"",
        year:"",
        seller:"",
        description:""
    }
    const [product,setProduct]=useState(initialProduct)
    const [errors,setErrors]=useState({})
    const handleChange=(e)=>{
        const {name ,value}=e.target
        setProduct({
            ...product,
            [name]:value
        })
    }
    const validateProduct=()=>{
        const errors ={}
        const requiredFields=["title","price","category","condition","year","seller","description"]
        requiredFields.forEach(field=>{
            if(product[field].trim()==="")
                errors[field]=`${field} is required`
        })
        if(isNaN(Number(product.price)))
            errors.price="price should be a valid integer"
        else if(Number(product.price)<=0)
            errors.price="price should be positive integer"
        if(isNaN(Number(product.year)))
            errors.year="year should be a valid integer"
        else if(Number(product.year)>new Date().getFullYear())
            errors.year=`year should be upto ${new Date().getFullYear()} only`
        
        return {
            valid:Object.keys(errors).length===0?true:false,
            errors
        }
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const result=validateProduct()
        setErrors(result.errors)
        if(!result.valid)
            return 
        try{
            const productToSend={
                ...product,
                price:Number(product.price),
                year:Number(product.year)
            }
            const response =await api.post("/api/products",productToSend)
            setProduct(initialProduct)
            setErrors({})
            alert("✅ Product added successfully")
            navigate('/')
        }catch(err){
            console.error(err)
            alert("❌ Failed to add Product. try again !")
        }
        
    }

    return (
        <div className="add-product">
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title : </label>
                    <input name="title"
                    type="text"
                    placeholder="Enter product title"
                    value={product.title} 
                    onChange={handleChange}/>
                    {errors.title && <p className="error">{errors.title}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price : </label>
                    <input name="price"
                    type="number"
                    placeholder="Enter product price"
                    value={product.price} 
                    onChange={handleChange}/>
                    {errors.price && <p className="error">{errors.price}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category : </label>
                    <input name="category"
                    type="text"
                    placeholder="Enter product category"
                    value={product.category} 
                    onChange={handleChange}/>
                    {errors.category && <p className="error">{errors.category}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="condition">Condition : </label>
                    <input name="condition"
                    type="text"
                    placeholder="Enter product condition"
                    value={product.condition} 
                    onChange={handleChange}/>
                    {errors.condition && <p className="error">{errors.condition}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="year">Year : </label>
                    <input name="year"
                    type="number"
                    placeholder="Enter year of manufacturing"
                    value={product.year} 
                    onChange={handleChange}/>
                    {errors.year && <p className="error">{errors.year}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="seller">Seller : </label>
                    <input name="seller"
                    type="text"
                    placeholder="Enter product seller"
                    value={product.seller} 
                    onChange={handleChange}/>
                    {errors.seller && <p className="error">{errors.seller}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description : </label>
                    <input name="description"
                    type="text"
                    placeholder="Enter product description"
                    value={product.description} 
                    onChange={handleChange}/>
                    {errors.description && <p className="error">{errors.description}</p>}
                </div>
                <button type="submit">Add Product</button>
            </form>
        </div>
    )

}

export default AddProduct