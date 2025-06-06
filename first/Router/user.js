const express= require('express')

const router = express.Router()    

const userController = require('../Controller/user')


router.post('/create',userController.createUser)
router.get('/getall',userController.getall)
router.get('/getone/:id',userController.getone)

router.get("/getquery",userController.getquery)
router.get("/login",userController.login)
router.patch("/reset",userController.reset)

router.patch("/forgot",userController.forgot)

router.get("/getyear",userController.getyear)



module.exports = router
