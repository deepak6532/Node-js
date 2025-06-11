const express = require('express')

const router = express.Router()    

const userController = require('../Controller/user')

const auth = require("../Middleware/auth")

router.post('/create',userController.create)
router.get('/getall',userController.getall)


module.exports = router