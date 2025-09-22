const express = require("express")
const cors = require("cors")
const mongoose = require ("mongoose")
const app = express();
const PORT =  process.env.PORT || 5000;
app.use(cors())
app.use(express.json())
require("dotenv").config()

const connectedDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB Connected Successfully!")
    } catch (error) {
         console.log("Error connected Db", error)
        process.exit(1)
    }
}

app.use("/", async(req, res)=>{
  console.log(`Server Running on Port ${PORT}`)    
})

connectedDb().then(()=>{
    app.listen(PORT, ()=>{
       console.log(`Server Running on Port ${PORT}`) 
    })
})