import mongoose from 'mongoose'
const user=mongoose.Schema({    //Schema for New User Signup
    name:String,
    email:String,
    password:String,
})
export const User=mongoose.model('User',user);  //Creating Model of above Schema