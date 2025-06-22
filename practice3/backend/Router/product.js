const express = require("express")

const auth = require("../Middleware/auth")

const router =  express.Router()
const productController = require("../Controller/product")

router.post("/addproduct",auth , productController.addproduct)
router.get("/getproduct",auth,productController.getproduct)


module.exports = router

