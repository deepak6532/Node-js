const express = require("express")

const userController = require("../Controller/user")

const router = express.Router()



router.post("/create",userController.create)
router.get("/getall",userController.getall)    //we can use Post

router.get("/getid/:id",userController.getid)


router.put("/update",userController.update)
router.delete('/delete',userController.delete)
router.post('/login',userController.login)

router.patch('/reset',userController.reset)
router.patch("/forgot",userController.forgot)


module.exports = router