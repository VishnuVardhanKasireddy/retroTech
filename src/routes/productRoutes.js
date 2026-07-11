const express=require("express")
const productController = require("../controllers/productController.js")
const {validateFilters} = require("../middleware/validateProductFilters.js")
const router=express.Router();

router.get("/",validateFilters,productController.getAllProducts)

router.get("/:id",productController.getProductById)

router.post("/",productController.postProduct)

router.put("/:id",productController.putProduct)

router.delete("/:id",productController.deleteProduct)

module.exports = router