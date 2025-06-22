const express = require("express")
const mongoose = require("mongoose")

const cors = require("cors")
const port = 8082
const app = express()

const mongoURL = "mongodb://localhost:27017/practice3"
mongoose.connect(mongoURL)

app.use(express.json())
app.use(cors())

const userRouter =  require("./Router/user")
const productRouter =  require("./Router/product")

app.use("/user",userRouter)
app.use("/product",productRouter)



app.listen(port,()=>{
    console.log("server is running on this port ",port)
})