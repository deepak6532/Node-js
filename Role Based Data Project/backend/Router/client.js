const express =  require("express")

const auth  =  require('../Middleware/auth')
const auth2  =  require('../Middleware/auth2')

const router   = express.Router()

const clientController =  require("../Controller/client")
const auth3 = require("../Middleware/auth3")


router.post("/clientsignup",auth3,clientController.clientsignup)

router.get("/clientlogin",clientController.clientlogin)


router.get("/getclient",auth3,clientController.getclient)


module.exports =  router