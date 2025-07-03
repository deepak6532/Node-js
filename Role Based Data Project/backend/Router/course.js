const express =  require('express')

const auth3 = require("../Middleware/auth3")

const router=  express.Router()

const courseController  = require('../Controller/course')


router.post("/addcourse" ,auth3,courseController.addcourse)

router.get("/getcourse" ,auth3,courseController.getcourse)


module.exports = router