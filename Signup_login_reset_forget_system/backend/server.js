const express = require("express")
const mongoose = require("mongoose")

const cors = require("cors")
const app = express()
const port = 8082
app.use(express.json())
app.use(cors())

const mongoURL  = "mongodb://localhost:27017/student"

mongoose.connect(mongoURL)

const userRoutes = require('./Router/user');      

app.use('/user', userRoutes);


app.listen(port,()=>{
    console.log('server is running on this port',port)
})