
const express = require("express")
const mongoose  = require("mongoose")


const app = express()
const port = 8082
app.use(express.json())


const mongoURL  = "mongodb://127.0.0.1:27017/product"

mongoose.connect(mongoURL)

const userRoutes = require('./Router/user');      

app.use('/users', userRoutes);



app.listen(port,()=>{
    console.log("server is running on this ",port)
})
