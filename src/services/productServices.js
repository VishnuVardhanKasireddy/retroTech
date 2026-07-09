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

const updateProduct=async(id,updates)=>{
    const products=await fileHandler.readProducts();

    const index=products.findIndex(p=>p.id===Number(id))

    if(index===-1)
        return null

    const updatedProduct={
        ...products[index],
        ...updates,
        id:Number(id)
    }
    products[index]=updatedProduct

    await fileHandler.writeProducts(products)

    return updatedProduct
}

module.exports={
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct
}