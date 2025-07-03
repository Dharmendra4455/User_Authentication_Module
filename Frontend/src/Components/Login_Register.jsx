import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Dashboard from '../dashboard'
const Login_Register = () => {
const[name,setname]=useState("")
const[email,setemail]=useState()
const[password,setpassword]=useState()
const[conformpassword,setconformpassword]=useState()
const[isalredyregister,setisalreadyregister]=useState(false) //initially it false which result first show Registration form
const[isweakpass,setweakpass]=useState(false)
const[loggeddata,setloggeddata]=useState()
const isalredyregisterHandler=()=>{
  if(!isalredyregister)            //status of already registered or not
    setisalreadyregister(true)
  else
  setisalreadyregister(false)
}

const nameHandler=(e)=>{
    setname(e.target.value)     //save the name 
    document.getElementById('input_name').style.outlineColor='white' //after error if any change occur then it outline color=white
  
    }

 const emailhandler=(e)=>{
        setemail(e.target.value)  //save the email 
        document.getElementById('input_email').style.outlineColor='white' 
 }
 const passwordHandler=(e)=>{
   setpassword(e.target.value)
   document.getElementById('input_password').style.outlineColor='white'
 
    if(!password){
  //  alert("hello")
     document.getElementById('password').style.display="none"
 }


    if(password.length<8)      //for weak password
  {
     document.getElementById('password').style.display='block'
     document.getElementById('password').innerHTML='weak Password'
     document.getElementById('password').style.color="red" 
     setweakpass(true)
  }

   if(password.length>=8 && (/[A-Z]/.test(password) || /[a-z]/.test(password) || /[0-9]/.test(password) || /[!@#$%^&*]/.test(password)) )
    {
     document.getElementById('password').style.display='block'    //for good strength password
     document.getElementById('password').innerHTML='Good'
     document.getElementById('password').style.color="yellow"
        setweakpass(false)
   } 
   if(password.length>=8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && ( /[0-9]/.test(password) || /[!@#$%^&*]/.test(password)) )
    {
     document.getElementById('password').style.display='block'
     document.getElementById('password').innerHTML='Very Good'   //for good strength password
     document.getElementById('password').style.color="lightgreen"
     setweakpass(false)
   } 
   if(password.length>=8 &&(/[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*]/.test(password)) )
    {
     document.getElementById('password').style.display='block'
     document.getElementById('password').innerHTML='Excellent'   //for excellent strength password
     document.getElementById('password').style.color="lightgreen"
     setweakpass(false)
   }
  
   if(!password){
     document.getElementById('password').style.display=none   //if no change in password input then error text display none
   } 
} 

//alert(password,conformpassword)
const conformpasswordHandler=(e)=>{
   setconformpassword(e.target.value)    //save conform password
   document.getElementById('input_condformpassword').style.outlineColor='white'
   document.getElementById('conformpassword').style.display='none'
}

// alert(conformpassword)
useEffect(()=>{
   document.getElementById('my_modal_3').showModal()  //start DuisyUI model when component render once 
},[])

const RegisterHandler=()=>{ //register button handler
  if(name){
     if(email.includes("@gmail.com")||email.includes(".in")||email.includes("yahoo.com")){
         //email formate validate
       if(password){
         if(conformpassword){
     
           if(password===conformpassword)
            {
                   //if all constraint satisfied then send to backend for register  
       
                   document.getElementById('password').style.display='none'

                   actionHandler()    //password==conformpassword then call
                   
                   setname("")              //all input field set to empty
                   setemail("")
                   setpassword("")
                   setconformpassword("")


            }
           else{
               //still show conform pass when wrong pass
            document.getElementById('conformpassword').style.display='block'
           } 
        }
         else{
             //document.getElementById('conformpassword').style.outlineColor='red'
             document.getElementById('input_condformpassword').style.outlineColor='red'  
         }
         //password constraint

       }
       else{
         document.getElementById('input_password').style.outlineColor='red'
       }
     }
     else{
       document.getElementById('input_email').style.outlineColor='red'          //show error by outline =red 
     }
  }
  else{
     document.getElementById('input_name').style.outlineColor='red'  
      
    }
  
}

const actionHandler=()=>{   
 if(!isweakpass){
  
   //axios for new register 
   
    const data={name,email,password}
    axios.post("http://localhost:4000/user/signup",data)  //sending data to backend for register
    .then((userdata)=>{
      alert(userdata.data.message)
     
    })
  }
  

 
 else{
  alert("Password too weak")     //not send if password weak 
 }  
}
const LoginHandler=()=>{
   
      //  axios for new login
        
         const data={email,password}
      try{

          axios.post("http://localhost:4000/user/login",data) //sending data to backend for login
       .then((userdata)=>{
        alert(userdata.data.message)
       
      if(userdata.data.message!="Invalid user email or pasword !!")  //if valid login then save into loggeddata
        setloggeddata(userdata)

        setemail("")    //after one  login make input field empty
        setpassword("")
    })
      }
      catch(err){
        alert("Something Went wrong",err)

      }
   
}
return (<>
                   {/* if logged successful then open its dashboard otherwise show Login page */}
     {loggeddata?<Dashboard data={loggeddata}/>:  

  <div>
   {/* <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button> */}
 <dialog id="my_modal_3" className="modal ">
  <div className="modal-box w-80">
  <div  className=' w-60'>
      {isalredyregister?<h3 className="font-bold text-xl mb-2 text-center">Login</h3>:
      <h3 className="font-bold text-xl mb-2 text-center">Registration</h3>}

   {isalredyregister?"": <label className='nameSection'>
    
    <div className="mb-1 text-[17px]">Name</div>
     <input type="text" id='input_name'  onChange={nameHandler}
      value={name} required className='name outline bg-zinc-700  text-xl p-1 rounded' placeholder='Dharmendra Patel' />
    {/* <p id='name' className='hidden text-sm  text-red-600'>Can't Empty</p> */}
    </label>

   }
    
    <div className='mb-1 mt-2 text-[17px]'>Email</div>
     <input type="email" id='input_email' value={email} onChange={emailhandler}
      required className='outline bg-zinc-700  text-xl p-1 rounded' placeholder='@mail.com' />
     {/* <p id='email' className='hidden text-sm  text-red-600 '>show Error</p> */}
 
 
      <div className='mb-1 mt-2  text-[17px]'>Password</div>     
      <input type={isalredyregister?"":"password"} id='input_password' value={password} onChange={passwordHandler}  
      required  className='outline bg-zinc-700  text-xl p-1 rounded'/>
     {isalredyregister?"":<p id='password' className=' hidden text-sm  text-red-600 '>show Error</p>}

     
     {isalredyregister?"":  <label className='conformpasswordSection'>
        <div className='mb-1 mt-2  text-[17px]'>Conform Password</div>
      <input type="password" value={conformpassword} onChange={conformpasswordHandler}
      required id='input_condformpassword' className='outline bg-zinc-700  text-xl p-1 rounded'  />
      <p id='conformpassword' className=' hidden text-sm  text-red-600 '>password not match</p>
      </label>}

    {isalredyregister?<button onClick={LoginHandler} className='mt-3 btn text-[18px] w-full block  bg-blue-800'>Login</button>:<button className='mt-3 btn text-[18px] w-full block  bg-blue-800' onClick={RegisterHandler}>Register</button>}
    {isalredyregister? <p className='inline-block text-sm mt-1 font-bold'> Don't have account ?</p>:<p className='inline-block text-sm mt-1 font-bold'>Already Registered ? </p>}
     <span onClick={isalredyregisterHandler} className='text-blue-600 cursor-pointer'>Click here</span>
  </div>
  </div>
</dialog>
</div>}
</>  

)
}

export default Login_Register