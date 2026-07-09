const fs = require("fs")
const path = require("path")

const filePath=path.join(__dirname,"../data/productsData.js")

const readProducts= ()=>{
    try{
        const rawData=fs.readFileSync(filePath,"utf-8")
        
        return JSON.parse(rawData)
    }catch(error){
        console.log("error reading file : ",error)

        return []
    }
}
const writeProducts=async(productArray)=>{
    try{
        const jsonString=JSON.stringify(productArray,null,2)

        await fs.writeFileSync(filePath,jsonString,"utf-8")
        
        return true
    }catch(error){
        console.error(`Error writing to products : ${error}`)
    }
}

module.exports={
    readProducts,
    writeProducts
}