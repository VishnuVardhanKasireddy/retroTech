const fileHandler = require("../utils/fileHandler.js")

const getAllProducts=async(filters)=>{
    let products =await fileHandler.readProducts()

    if(filters.search?.trim()){
        const searchTerm=filters.search.toLowerCase()
        products=products.filter(p=>p.title.toLowerCase().includes(searchTerm) || p.description?.toLowerCase().includes(searchTerm))  
    }
    if(filters.category?.trim()){
        products=products.filter(p=>{
            return p.category.toLowerCase()===filters.category.toLowerCase()
        })
    }
    if(filters.minPrice){
        products=products.filter(p=>{
            return p.price>=Number(filters.minPrice)
        })
    }
    if(filters.maxPrice){
        products=products.filter(p=>{
            return p.price<=Number(filters.maxPrice)
        })
    }
    if(filters.sort){
        switch(filters.sort){
            case "price" : products.sort((a,b)=>a.price-b.price)
                           break;
            case "-price":products.sort((a,b)=>b.price-a.price)
                          break;
            case "year":products.sort((a,b)=>a.year-b.year)
                          break;
            case "-year":products.sort((a,b)=>b.year-a.year)
                          break;
            default : break;
        }
    }

    if(filters.page && filters.limit){
        const page=Number(filters.page)
        const limit=Number(filters.limit)

        const startIndex=(page-1)*limit
        const endIndex=startIndex+limit

        products=products.slice(startIndex,endIndex)
    }

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

const deleteProduct=async(id)=>{
    const products=await fileHandler.readProducts()

    const index=products.findIndex(p=>p.id===Number(id))

    if(index===-1)
        return false;

    products.splice(index,1)

    await fileHandler.writeProducts(products)
    return true
}

module.exports={
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}