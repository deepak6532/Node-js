const express = require("express")

const router =  express.Router()

const auth3 = require("../Middleware/auth3")

const batchController =  require("../Controller/batch")

router.post("/addbatch",auth3,batchController.addbatch)

router.get("/getbatch",auth3,batchController.getbatch)




module.exports =  router