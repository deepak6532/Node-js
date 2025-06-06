const express = require("express");
const mongoose = require("mongoose");

const cors = require('cors');

const app  = express()
const port = 8082

const mongoURL = 'mongodb://localhost:27017/javascript'
// database name => javascript 

mongoose.connect(mongoURL)

app.use(express.json())     // to parse JSON data from the request body
                            // Middleware to parse JSON data from the request body
                            
app.use(cors())  

const userRoutes = require('./Router/user');     //router import 

app.use('/users', userRoutes);





app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}/`)
})