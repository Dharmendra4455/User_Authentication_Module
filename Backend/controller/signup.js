import { User } from "../schema.js";
import bcrypt from 'bcryptjs'
export const signup=async(req,res)=>{
   try{
     const {name,email,password}=req.body;
   
    const isexist=await User.findOne({email})
    if(isexist){
     return res.status(200).json({message:"User with this email already exist"})
   }
   else{
    const hashpass=await bcrypt.hash(password,10)
    const data=await new User({
      name,
      email,
      password:hashpass
    })
     await data.save()
     res.status(200).json({message:"User registered Successfully"})
   }
   }
   catch(err){
    res.send({message:"Internal Server Error!!",err})
   }
}