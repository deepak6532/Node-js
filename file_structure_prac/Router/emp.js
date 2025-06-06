const express = require("express");

const router = express.Router();

const employeeController = require("../Controller/emp");


router.post("/createemp",employeeController.createemp)
router.get("/getemp",employeeController.getemp)
router.get("/getid/:id",employeeController.getid)
router.get("/getone/:name",employeeController.getone)
router.get("/getphone/:phone",employeeController.getphone)
router.get("/getquery",employeeController.getquery)






module.exports = router