const fileHandler = require("../utils/fileHandler.js")

const getAllProducts=()=>{
    const products = fileHandler.readProducts()

    return products
}

module.exports={
    getAllProducts
}