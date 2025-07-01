const express =  require("express")

const router   = express.Router()
const userController =  require("../Controller/user")



router.post("/main",userController.main)

router.post("/mlogin",userController.mlogin)



module.exports = router