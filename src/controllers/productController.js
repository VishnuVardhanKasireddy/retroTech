const productServices = require("../services/productServices.js")

const getAllProducts = async(req,res)=>{
    try{
        const filters=req.query

        const products = await productServices.getAllProducts(filters)

        return res.status(200).json(products)
    }catch(error){
        console.log("Error in getAllProducts controller : ",error)
        return res.status(500).json({
            error : "Internal server error"
        })
    }
}
const getProductById=(req,res)=>{
    try{
        const id=req.params.id
        const product=productServices.getProductById(id)
        if(!product){
            return res.status(404).json({message:`product with id : '${id}' not found`})
        }
        return res.status(200).json(product)
    }catch(error){
        console.log(`Error at getProductById controller : ${error}`)
        res.status(500).json({error:"Internal server error"})
    }
}

const postProduct=async(req,res)=>{
    try{
        const {title,price,category,condition,year,seller,description}=req.body

        if(!title || !price || !category|| !condition ||!year || !seller || !description)
            return res.status(400).json({message:"All fields are required (title, price, category, condition, year, seller, description) !"})

        if(typeof price!=="number" || price<=0)
            return res.status(400).json({message:"Price must be a number and must be greater than zero !"})

        if(typeof year!=="number" || year<=0)
            return res.status(400).json({message:"Year must be a number and greater than zero !"})

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
        console.error(`Error at postProduct : ${error}`)
        return res.status(500).json({message:`Internal server error !`})
    }
}

const putProduct=async(req,res)=>{
    try{
        const {id}=req.params
        const updates=req.body
        if(updates.price!==undefined){
            if(typeof updates.price!=='number' || updates.price<=0){
                return res.status(400).json({message:"price must be a number and greater than zero"})
            }
        }
        if(updates.year!==undefined){
            if(typeof updates.year!=='number' || updates.year<=0){
                return res.status(400).json({messsage:"year must be a number and greater than zero"})
            }
        }

        const updatedProduct=await productServices.updateProduct(id,updates)
        if(!updatedProduct){
            return res.status(404).json({message:`Product with id : ${id} not found`})
        }

        return res.status(200).json(updatedProduct)
    }catch(error){
        console.error(`Error found at putProduct controller : ${error}`)
        return res.status(500).json({message:"Internal server error!"})
    }
}

const deleteProduct=async(req,res)=>{
    try{
        const {id}=req.params
        
        const isDeleted=await productServices.deleteProduct(id)

        if(!isDeleted){
            return res.status(404).json({message:`Product with id : ${id} not found`})
        }

        return res.status(200).json({message:`Product with id : ${id} is deleted`})
    }catch(error){
        console.error(`Error found at deleteProduct Controller : ${error}`)
        return res.status(500).json({message:"Internal server error!"})
    }
}

const getCategories=async(req,res)=>{
    try{
        const categories=await productServices.getCategories()

        return res.status(200).json(categories)
    }catch(error){
        console.error(`Error found at getCategories controller : ${error}`)
        return res.status(500).json({message:"Internal server error"})
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