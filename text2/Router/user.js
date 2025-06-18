const express = require("express")

const router =  express.Router()

const userController = require("../Controller/user")

const auth  = require("../Middleware/auth")




router.post("/signup",userController.signup)

router.get("/login",userController.login)








module.exports =  router