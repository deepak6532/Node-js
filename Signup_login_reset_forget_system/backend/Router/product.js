const express = require("express")

const router = express.Router()

const auth =  require("../Middleware/auth")

const userController = require("../Controller/product")

router.post("/addproduct",auth,userController.addproduct)

router.get("/getproduct",auth,userController.getproduct)





module.exports = router