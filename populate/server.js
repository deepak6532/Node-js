const express = require("express")
const mongoose = require("mongoose")

const cors = require("cors")

const app =  express()

const port = 8082

const mongoURL = 'mongodb://localhost:27017/sample';

mongoose.connect(mongoURL)

app.use(express.json())
app.use(cors())



const userRouter = require("./Router/user")

const productRouter  =  require("./Router/product")

app.use("/user2",userRouter)
app.use("/product",productRouter)

app.listen(port,()=>{
    console.log("server is running on this pot ",port)
})