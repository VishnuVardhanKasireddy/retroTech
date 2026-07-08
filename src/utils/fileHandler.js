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

module.exports={
    readProducts
}