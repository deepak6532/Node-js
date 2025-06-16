const express  = require("express")

const router  =  express.Router()

const userController  =  require("../Controller/user")

const auth = require("../Middleware/auth")


router.post("/signup",userController.signup)

router.post("/login",userController.login)

router.patch("/reset",userController.reset)

router.put("/forgot",userController.forgot)


router.put("/update",auth,userController.update)

router.delete("/delete",userController.delete)



module.exports = router