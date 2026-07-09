const productServices = require("../services/productServices.js")

const getAllProducts = (req,res)=>{
    try{
        const products = productServices.getAllProducts()

        res.status(200).json(products)
    }catch(error){
        console.log("Error in getAllProducts controller : ",error)
        res.status(500).json({
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

module.exports = {
    getAllProducts,
    getProductById,
    postProduct
}