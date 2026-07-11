
const validateFilters=async(req,res,next)=>{
            const filters=req.query

            const allowedFields=["price","-price","year","-year"]
    
            if((filters.minPrice && isNaN(Number(filters.minPrice)))||(filters.maxPrice && isNaN(Number(filters.maxPrice)))){
                return res.status(400).json({error:"MinPrice and MaxPrice must be valid integers!"})
            }
    
            if(filters.minPrice && Number(filters.minPrice)<0){
                return res.status(400).json({error:"minimum price can not be negative"})
            }
    
            if(filters.maxPrice && Number(filters.maxPrice)<0){
                return res.status(400).json({error:"maximum price can not be negative"})
            }
    
            if(filters.minPrice && filters.maxPrice && Number(filters.minPrice)>Number(filters.maxPrice)){
                return res.status(400).json({error:"minimum price can not be more than maximum price"})
            }

            if(filters.sort && !allowedFields.includes(filters.sort)){
                return res.status(400).json({error:`Invalid sort field : ${filters.sort}`})
            }

            next()
}

module.exports={
    validateFilters
}