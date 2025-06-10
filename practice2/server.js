const express = require("express")

const mongoose = require("mongoose")

const cors= require("cors")

const app = express()

app.use(express.json())
app.use(cors())


const userRoutes = require("./Router/user")

const port = 8082

const mongoURL = "mongodb://localhost:27017/practice"
mongoose.connect(mongoURL)


app.use("/user",userRoutes)

app.listen(port,()=>{
    console.log('Server is running on this: ',port)
})

