const express =  require("express")

const auth2  =  require('../Middleware/auth2')
const auth  =  require('../Middleware/auth')


const router   = express.Router()

const emplyeeController =  require("../Controller/employee")


router.post("/employeesignup",auth2,emplyeeController.employeesignup)

router.get("/employeelogin",emplyeeController.employeelogin)

router.get("/getemployee",auth2,emplyeeController.getemployee)

module.exports =  router