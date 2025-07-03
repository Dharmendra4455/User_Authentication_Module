import React, { useState } from 'react'
import Login_Register from './Components/Login_Register'
  import { ToastContainer, toast } from 'react-toastify';
const Dashboard = (props) => {
    const username=JSON.stringify(props.data.data.data.name)
    const useremail=JSON.stringify(props.data.data.data.email)
    const[islogout,setislogout]=useState(false)
    
    const logoutHandler=()=>{
    
     setislogout(true)
 }
 const toastify=()=>{
  
    toast("Wow so easy!")
 }
  return (
   <>
   {/* if logout then move to signup page/Home Page */}
{islogout?<Login_Register/>:
   <div className="body">
   <div className="nav flex justify-between">
    <div className="welcome_section ">
    <h1 className='text-xl ml-2 inline-block'>WELCOME</h1>
    <span className='inline-block text-blue-600 font-semibold ml-4 text-2xl'>{JSON.parse(username)}</span>
   </div>
<div  onClick={logoutHandler} className="logout text-xl btn bg-red-600 mr-4 mt-2">Logout</div>
        
    </div>
    <div className="email text-lg ml-2">Email:{JSON.parse(useremail)}</div>
   </div>}
   </>
  )
}

export default Dashboard