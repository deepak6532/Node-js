const express = require("express")
const mongoose =  require("mongoose")

const cors  = require("cors")


const port =  8082
const app =  express()
app.use(express.json())
app.use(cors())


const mongoURL = "mongodb://localhost:27017/text4"

mongoose.connect(mongoURL)

const userRouter = require("./Router/user")
app.use("/user4",userRouter)

const clientRouter  = require("./Router/client")
app.use("/client",clientRouter)

const employeeRouter =  require("./Router/employee")
app.use("/employee",employeeRouter)

const productRouter  = require("./Router/product")
app.use("/product",productRouter)


app.listen(port,()=>{
    console.log("server is running on this port ",port)
})