const express = require("express")
const cors = require('cors')

const app = express()
const adminRouter = require("./Routes/Admin")
const publicRouter = require("./Routes/Public")
const studentRouter = require("./Routes/Students")
const {authenticationUser }= require("./Utils/userAuth")

app.use(cors())     
app.use(express.json())
app.use("/public",publicRouter)
app.use("/admin",authenticationUser,adminRouter)
app.use("/students",authenticationUser,studentRouter)


app.listen(4000,()=>{
    console.log("Server started on port 4000 .......")
})

