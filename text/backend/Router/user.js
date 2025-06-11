const express = require("express")
// const mongoose = require("mongoose")

const router =  express.Router()

const userController = require("../Controller/user")

const auth  = require("../Middleware/auth")


router.post("/signup",userController.signup)
router.post("/login",userController.login)
router.put("/reset",userController.reset)

router.put("/forgot",userController.forgot)


router.get("/getuserdata",auth,userController.getuserdata)








module.exports = router