const express =  require("express")

const auth2  =  require('../Middleware/auth2')
// const auth  =  require('../Middleware/auth')


const router   = express.Router()

const emplyeeController =  require("../Controller/employee")
const auth3 = require("../Middleware/auth3")


router.post("/employeesignup",auth2,emplyeeController.employeesignup)

router.post("/employeelogin",emplyeeController.employeelogin)

router.get("/getemployee",auth3,emplyeeController.getemployee)

router.get("/getclientemp/:id",auth3,emplyeeController.getclientemp)

router.get("/allemployee",auth3,emplyeeController.allemployee)

router.get("/allemp" ,auth3,emplyeeController.allemp)


module.exports =  router