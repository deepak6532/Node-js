const express =  require("express")

const router=  express.Router()

const productController =  require("../Controller/product")

const auth = require("../Middleware/auth")


router.post("/addproduct",productController.addproduct)
router.get("/getproduct",auth,productController.getproduct)



module.exports =  router



