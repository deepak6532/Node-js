const express =  require("express")

const router   = express.Router()
const auth  =  require("../Middleware/auth")

const productController =  require("../Controller/product")


router.post("/addproduct",auth,productController.addproduct)


router.get("/getproduct",auth,productController.getproduct)



module.exports  = router