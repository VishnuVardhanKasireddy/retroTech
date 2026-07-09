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

const createProduct=async(product)=>{
    const products=await fileHandler.readProducts()

    const maxID=products.reduce((maxID,p)=>(p.id>maxID?p.id:max),0)

    const newId=maxID+1

    const newProduct={
        id:newId,
        ...product
    }
    products.push(newProduct)
    await fileHandler.writeProducts(products)

    return newProduct
}

module.exports={
    getAllProducts,
    getProductById,
    createProduct
}