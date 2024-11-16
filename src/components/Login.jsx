import React, { useEffect, useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
    
    const [err,setErr]=useState(null)
    const [userData,setUserData]=useState({
        username:"",
        password:""
    })

    const navigate = useNavigate()

    const notify = (err) => toast.error(err,{
        position:"bottom-center"
    });

    const login = async(e)=> {
        e.preventDefault()
        await axios.post("https://ecellblog-server.onrender.com/adminlogin",userData).then((res)=>{
            localStorage.setItem("token",res.data.token)
            navigate("/")
        }).catch(err=>{
            setErr(err)
            console.log(err.code)
        })
    }

    useEffect(()=>{
        if(err) {
        notify(err.code==="ERR_BAD_REQUEST"?"Invalid Username or Password":"ERR")
        }
    },[err])

  return (
    <div className='login'>
        <div className='loginHolder'>
            <div className='heading'>
                <h1>E-Cell BTU Admin</h1>
            </div>
            <div className='inputHolder'>
                <label htmlFor="">Username</label>
                <input type="text" value={userData.username} onChange={(e)=>setUserData({...userData,username:e.target.value})}/>
                <label htmlFor="">Password</label>
                <input type="password" value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})}/>
            </div>
            <div className='btnHolder'>
                <button onClick={(e)=>login(e)}>Login</button>
            </div>
        </div>
        <ToastContainer />
    </div>
  )
}
