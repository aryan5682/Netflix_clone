const express=require("express");
const cors =require("cors");
const mongoose = require('mongoose');
const dotenv=require('dotenv');
const userRoutes=require("./Routes/UserRoute")
dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
const MONGODB=process.env.Mongo; // changed
mongoose.connect(MONGODB,{
useNewUrlParser:true,
useUnifiedTopology:true,
}).then(()=>{
  console.log("DB Connected");
}).catch(err => {console.log("error")});
app.use("/api/user",userRoutes)
app.listen(5000,console.log("server started"));