import express from "express"
const app =express()
import cors from 'cors'
app.use(cors())
app.use(express.json())
import mongoose from "mongoose"
import { loginroute, signuproute } from "./Routing.js"

try{//connecting to DB with Dbname User_Authentication
    mongoose.connect("mongodb://localhost:27017/User_Authentication") 
    console.log("Database Connected")
}
catch(err)
{
    console.log("Server Error!! ",err);
}
app.listen(4000,()=>{
    console.log("app Listening at port no.s",4000)  //lister at port 4000
})
app.use('/user',signuproute) //signup middleware
app.use('/user',loginroute)  //login middleware
