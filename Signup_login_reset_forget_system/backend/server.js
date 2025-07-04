const express = require("express")
const mongoose = require("mongoose")

const fileUpload = require("express-fileupload")

// .env import
const env =  require("dotenv")
env.config()

const cors = require("cors")
const app = express()
const port = 8082
app.use(express.json())
app.use(cors())

app.use(fileUpload())

const mongoURL  = "mongodb://localhost:27017/student"

mongoose.connect(mongoURL)

const userRoutes = require('./Router/user');     

const productRoutes = require('./Router/product')

app.use('/user', userRoutes);
app.use('/product',productRoutes);


app.listen(port,()=>{
    console.log('server is running on this port',port)
})