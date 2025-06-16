// const express = require("express");
// const mongoose = require("mongoose");

// const app = express();

// const port = 8082;

// const mongoURL = 'mongodb://localhost:27017/javascript';

// mongoose.connect(mongoURL);

// app.use(express.json()); // add middleware to parse JSON data

// // create employee schema

// const employeeschema = new mongoose.Schema({
//     name: {
//         type: String,
//         require: true
//     },
//     age: {
//         type: Number,
//         require: true
//     },
//     fname: {
//         type: String,
//         require: true
//     },
//     city: {
//         type: String,
//         require: true
//     },
//     field: {
//         type: String,
//         require: true
//     },
//     salary: {
//         type: Number,
//         require: true
//     },
//     phone: {
//         type: Number,
//         require: true
//     },
//     email: {
//         type: String,
//         require: true
//     }

// })

// const employee = mongoose.model("employee", employeeschema);






// // create api to send data to database
// app.post("/addemployee", async (req, res) => {
//     const data = req.body;
//     console.log(data);

//     const abc = new employee(data);
//     await abc.save();
//     return res.status(201).send(abc);
// })


// // create api to get all data from database  => find() 

// app.get("/getemployee", async(req, res) => {

//     const data = await employee.find();
//     return res.status(202).send(data);
// })


// // create api to get single data using id  =>  findById(id),findOne()

// app.get("/getById/:id",async(req,res)=>{
//     const {id} = req.params;

//     const data =  await employee.findById(id);
//     console.log(data);
//     return res.status(202).send(data);
// })


// app.get("/getquery",async(req,res)=>{
//     const {id} = req.query
//     // console.log(".........",req.query)
//     const data  =  await employee.findById(id)
//     return res.status(202).send(data)
// })





// // create api to calculate the two value

// app.post('/calculate', async (req, res) => {
//     const { num1, num2, c } = req.body;

//     if (c === "+") {

//         const result = num1 + num2
//         console.log(result);
//         return res.status(202).send(result);
//     }
//     else if (c === "-") {
//         const result = num1 - num2
//         console.log(result);
//         return res.status(202).send(result);

//     }
//     else if (c === "*") {
//         const result = num1 * num2
//         console.log(result);
//         return res.status(202).send(result);
//     }
//     else if (c === "/") {
//         const result = (num1 / num2).toFixed(2);
//         console.log(result);
//         return res.status(202).send(result);
//     }
//     else{
//         console.log("Invalid operator");
//         return res.status(400).send("Invalid operator");
//     }
// })



// // create api to generate otp in length of character

// app.post("/generateotp",async(req,res)=>{
//     const {length} = req.body

//     let otp =""
//     for(let i=0;i<length;i++){
//         const random = Math.floor(Math.random()*10);
//         otp += random;
//     }
//     console.log(otp);
//     return res.status(201).send(otp);
// })








// app.listen(port, () => {
//     console.log("server is running on port :", port);
// })


