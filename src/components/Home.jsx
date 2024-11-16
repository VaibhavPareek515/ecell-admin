import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import axios from 'axios'
import { Navbar } from './Navbar'

export const Home = () => {
    // const [user,setUser]=useState({})
    // const getData = async()=>{
    //     const tkn = localStorage.getItem("token")
    //     await axios.get("http://localhost:8080/protected",{
    //         headers: {'authorization':tkn}
    //     }).then((res)=>{
    //         setUser(res.data)
    //     }).catch(err=>console.log(err))
    // }

    // useEffect(()=>{
    //     getData()
    // },[])

  return (
    <>{(localStorage.getItem("token"))?
        <>
        <Navbar/>
        <Outlet/>
        </>
    :<Navigate to="/login"/>}
    </>
  )
}
