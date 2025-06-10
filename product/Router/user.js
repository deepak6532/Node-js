const express = require('express')

const router = express.Router()    

const userController = require('../Controller/user')


router.post('/create',userController.create)
router.get('/getall',userController.getall)


module.exports = router