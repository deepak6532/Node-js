const express = require("express")

const mongoose = require("mongoose")

const cors =  require("cors")

const app =  express()

const port = 8082

const mongoURL =  "mongodb://localhost:27017/text2"

mongoose.connect(mongoURL)

app.use(express.json())
app.use(cors())


const userRoutes = require("./Router/user")

const productRoutes  = require("./Router/product")



app.use('/user', userRoutes);

app.use("/product",productRoutes)





app.listen(port,()=>{
    console.log("server is running on this port ",port)
})

