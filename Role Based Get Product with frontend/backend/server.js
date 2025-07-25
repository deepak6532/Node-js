const express = require('express')
const mongoose = require("mongoose")

const fileUpload = require("express-fileupload")

// import .env file
const env = require("dotenv")
env.config()

const cors = require("cors")

const port = 8082
const app  = express()

const mongoURL = "mongodb://localhost:27017/text3"

mongoose.connect(mongoURL)

app.use(express.json())
app.use(cors())
app.use(fileUpload())

const userRouter =  require("./Router/user")

const productRouter =  require("./Router/product")

app.use("/user2",userRouter)

app.use("/product",productRouter)

app.listen(port,()=>{
    console.log("server is running on this port ",port)
})

