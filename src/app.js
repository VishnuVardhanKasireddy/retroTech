const express=require("express")
const router = require("./routes/productRoutes.js")
const app=express()

app.use(express.json());

app.get("/health",(req,res)=>{
    res.status(200).json({
        status:"OK!"
    });
});

app.use("/api/products",router)

module.exports={app};
