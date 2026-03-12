require("dotenv").config();
const express=require("express");
const cors=require("cors");
const authRoutes=require("./routes/authRoutes");
const aiRoutes=require("./routes/aiRoutes");
const connectDB=require("./config/db");
const { connect } = require("mongoose");
const app=express()

connectDB();
app.use(cors());
app.use(express.json());

const PORT=process.env.PORT||3000

app.use('/api/auth',authRoutes)
app.use('/api/ai', aiRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running in port ${PORT}`)
})

