const express =  require("express")



const auth3  =  require('../Middleware/auth3')


const router   = express.Router()
const productController = require("../Controller/product")



router.post("/addproduct",auth3,productController.addproduct)

router.get("/getproduct",auth3,productController.getproduct)


router.get('/getallproduct',productController.getallproduct)



module.exports =  router