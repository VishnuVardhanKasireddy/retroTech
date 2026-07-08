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

module.exports = {
    getAllProducts
}