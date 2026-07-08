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

module.exports = {
    getAllProducts,
    getProductById
}