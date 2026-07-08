const fileHandler = require("../utils/fileHandler.js")

const getAllProducts=()=>{
    const products = fileHandler.readProducts()

    return products
}
const getProductById=(id)=>{
    const products=fileHandler.readProducts()

    const numericId=Number(id)

    return products.find(p=>p.id===numericId)
}

module.exports={
    getAllProducts,
    getProductById
}