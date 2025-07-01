const express =  require("express")

const auth  =  require('../Middleware/auth')
const auth2  =  require('../Middleware/auth2')

const router   = express.Router()

const clientController =  require("../Controller/client")


router.post("/clientsignup",auth,clientController.clientsignup)

router.get("/clientlogin",clientController.clientlogin)


router.get("/getclient",auth2,clientController.getclient)


module.exports =  router