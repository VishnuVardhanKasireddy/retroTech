const productServices = require("../services/productServices.js")
const NotFoundError = require("../errors/NotFoundError.js")
const ValidationError = require("../errors/ValidationError.js")
const { validateFilters } = require("../middleware/validateProductFilters.js")

const getAllProducts = async(req,res,next)=>{
    try{
        const filters=req.query

        const products = await productServices.getAllProducts(filters)

        return res.status(200).json(products)
    }catch(error){
        next(error)
    }
}
const getProductById=async(req,res,next)=>{
    try{
        const id=req.params.id
        const product=await productServices.getProductById(id)
        if(!product){
            throw new NotFoundError(`Product with id : ${id} not found!`)
        }
        return res.status(200).json(product)
    }catch(error){
        next(error)
    }
}

const postProduct=async(req,res,next)=>{
    try{
        const {title,price,category,condition,year,seller,description}=req.body

        if(!title || !price || !category|| !condition ||!year || !seller || !description)
            throw new ValidationError("All fields are required (title, price, category, condition, year, seller, description) !")

        if(typeof price!=="number" || price<=0)
            throw new ValidationError("Price must be a number and must be greater than zero !")
            

        if(typeof year!=="number" || year<=0)
            throw new ValidationError("Year must be a number and greater than zero !")

        const newProduct=await productServices.createProduct({
            title,
            price,
            category,
            condition,
            year,
            seller,
            description
        })

        return res.status(201).json(newProduct)
    }catch(error){
        next(error)
    }
}

const putProduct=async(req,res,next)=>{
    try{
        const {id}=req.params
        const updates=req.body
        if(updates.price!==undefined){
            if(typeof updates.price!=='number' || updates.price<=0){
                throw new ValidationError("price must be a number and greater than zero")
            }
        }
        if(updates.year!==undefined){
            if(typeof updates.year!=='number' || updates.year<=0){
                throw new ValidationError("year must be a number and greater than zero")
            }
        }

        const updatedProduct=await productServices.updateProduct(id,updates)
        if(!updatedProduct){
            throw new NotFoundError(`Product with id : ${id} not found`)
        }

        return res.status(200).json(updatedProduct)
    }catch(error){
        next(error)
    }
}

const deleteProduct=async(req,res,next)=>{
    try{
        const {id}=req.params
        
        const isDeleted=await productServices.deleteProduct(id)

        if(!isDeleted){
            throw new NotFoundError(`Product with id : ${id} not found`)
        }

        return res.status(200).json({message:`Product with id : ${id} is deleted`})
    }catch(error){
        next(error)
    }
}

const getCategories=async(req,res,next)=>{
    try{
        
        const categories=await productServices.getCategories()

        return res.status(200).json(categories)
    }catch(error){
        next(error)
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    postProduct,
    putProduct,
    deleteProduct,
    getCategories
}