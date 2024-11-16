import React, { useEffect, useState } from 'react'
import { IoReorderThreeOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { LuLogOut } from "react-icons/lu";
import { FaUserAstronaut } from "react-icons/fa6";
import axios from 'axios';

export const Navbar = () => {
  const navigate = useNavigate()
  const [user,setUser]=useState(null)
    
  const getData = async()=>{
        const tkn = localStorage.getItem("token")
        await axios.get("https://ecellblog-server.onrender.com/protected",{
            headers: {'authorization':tkn}
        }).then((res)=>{
            setUser(res.data.message)
        }).catch(err=>console.log(err))
    }

    useEffect(()=>{
        getData()
    },[])

  const logout = ()=> {
    localStorage.removeItem("token")
    navigate("/login")
  }
  return (
    <div className='navbar'>
      <div className="navHolder">
        <div className="logo">
          <div style={{display:"flex",alignItems:"center",gap:"10px"}}><FaUserAstronaut/> {(user===null)?"":`${user.name}`}</div>
          <div className="routes">
            <Link to="/"><div>Add</div></Link>
            <Link to="/update"><div>Update</div></Link>
          </div>
        </div>

        <div className='btnHolder'>
            <button onClick={logout}><LuLogOut/></button>
        </div>
      </div>
    </div>
  )
}
