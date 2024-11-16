import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

export const Update = () => {
    const [posts,setPosts]=useState([])
    const [loading,setLoading]=useState(true)
    const navigate = useNavigate()

    const getPosts = async()=> {
        await axios.get("https://ecellblog-server.onrender.com/allpost").then((res)=>{
            console.log(res.data)
            setPosts(res.data)
            setLoading(false)
        }).catch(err=>console.log(err))
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    }

    useEffect(()=>{
        getPosts()
    },[])
  return (
    <div className='form'>
        <div className='formHolder'>
            {(!loading)?<div>
               {posts.map((d,i)=>(
                <div onClick={()=>navigate(`/update/${d._id}`)} className='post' key={d._id}>
                    <h1>{d.title}</h1>
                    <div style={{width:"100%",display:"flex",justifyContent:"right",paddingTop:"10px"}}><p>{formatDate(d.CreatedAt)}</p></div>
                </div>
               ))} 
            </div>:<div>loading...</div>}
        </div>
    </div>
  )
}
