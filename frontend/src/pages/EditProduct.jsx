import { useState,useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import api from '../api/axios'
import './EditProduct.css'

function EditProduct(){
    const initialProduct={
        title:"",
        price:"",
        category:"",
        condition:"",
        year:"",
        seller:"",
        description:""
    }
    const { id }=useParams()
    const [product,setProduct]=useState(initialProduct)
    const [errors,setErrors]=useState({})
    const navigate=useNavigate()
    useEffect(()=>{
        const fetchProduct=async()=>{
            const response = await api.get(`/api/products/${id}`)
            setProduct(response.data)
        }
        fetchProduct()
    },[id])

    const handleChange=(e)=>{
        const {name , value}=e.target
        setProduct({
            ...product,
            [name]:value
        })
    }
    const validateProduct=()=>{
        const errors={}
        const requiredFields=["title","category","condition","seller","description"]
        requiredFields.forEach((field)=>{
            if(product[field].trim()==="")
                errors[field]=`${field} can not be empty`
        })
        const price=Number(product.price)
        const year=Number(product.year)
        const curr_year=new Date().getFullYear()
        if(isNaN(price))
            errors.price="price should be a valid integer"
        else if(price<=0)
            errors.price="price should be positive integer"
        if(isNaN(year))
            errors.year="year should be a valid integer"
        else if(year > curr_year)
            errors.year=`year should be upto ${curr_year}`
        
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
            const productToSent={
                ...product,
                price:Number(product.price),
                year:Number(product.year)
            }
            const response=await api.put(`/api/products/${id}`,productToSent)
            
            setErrors({})
            alert("✅ successfully edited product!")
            navigate(`/products/${id}`)
        }catch(err){
            console.error(err)
            alert("❌ Failed to edit product. try again!")
        }
    }

    return (
        <div className='edit-product'>
            <h2>Edit Product </h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input name="title"
                    type="text"
                    placeholder='title'
                    value={product.title}
                    onChange={handleChange}
                    />
                    {errors.title && <p className='error'>{errors.title}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input name="price"
                    type="number"
                    placeholder='price'
                    value={product.price}
                    onChange={handleChange}
                    />
                    {errors.price && <p className='error'>{errors.price}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input name="category"
                    type="text"
                    placeholder='category'
                    value={product.category}
                    onChange={handleChange}
                    />
                    {errors.category && <p className='error'>{errors.category}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="condition">Condition</label>
                    <input name="condition"
                    type="text"
                    placeholder='condition'
                    value={product.condition}
                    onChange={handleChange}
                    />
                    {errors.condition && <p className='error'>{errors.condition}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="year">Year</label>
                    <input name="year"
                    type="number"
                    placeholder='year'
                    value={product.year}
                    onChange={handleChange}
                    />
                    {errors.year && <p className='error'>{errors.year}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="seller">Seller</label>
                    <input name="seller"
                    type="text"
                    placeholder='seller'
                    value={product.seller}
                    onChange={handleChange}
                    />
                    {errors.seller && <p className='error'>{errors.seller}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea name="description"
                    type="text"
                    placeholder='descrition'
                    value={product.description}
                    onChange={handleChange}
                    />
                    {errors.description && <p className='error'>{errors.description}</p>}
                </div>
                <button type='submit'>Edit Product</button>
            </form>
        </div>
    )
}

export default EditProduct