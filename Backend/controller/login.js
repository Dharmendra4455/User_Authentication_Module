import { User } from "../schema.js";
import bcrypt from "bcryptjs";
export const logger=async(req,res)=>{
    try{
    const {email,password}=req.body
   
    const isuserexist=await User.findOne({email})
    if(isuserexist){
        const userdata=isuserexist
        const passwordcheck =await bcrypt.compare(password,userdata.password)
        if(passwordcheck){
            res.status(200).json({message:"Login Successfully",data:{name:userdata.name,email:userdata.email}})
        }
        else{
          res.status(200).json({message:"Invalid user email or pasword !!"})   
        }
     
    }
    else{
        res.status(200).json({message:"Invalid user email or pasword !!"})
    }
    
    }
    catch(err){
        res.status(404).json({message:"Internal Server Error"})
    }
}