const express  =require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const app = express();

const port = 8082;

mongoURL = 'mongodb://localhost:27017/javascript';

mongoose.connect(mongoURL)

app.use(express.json());
app.use(cors());



const employeeController = require('./Router/emp')
app.use('/employee',employeeController);



app.listen(port,()=>{
    console.log("server is running on this :",port)
})


