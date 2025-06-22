const express = require("express")

const router = express.Router()

const auth = require("../Middleware/auth")


const UserController  = require("../Controller/user")


router.post("/signup",UserController.signup)
router.get("/login",UserController.login)



module.exports = router