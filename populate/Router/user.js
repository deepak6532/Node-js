const express =  require("express")


const router = express.Router();

const userController = require("../Controller/user")


router.post("/signup",userController.signup)

router.get("/login",userController.login)




module.exports =  router