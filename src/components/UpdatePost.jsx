import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import JoditEditor from 'jodit-react';
import parser from "html-react-parser"
import { Form } from './Form'
import axios from "axios"


export const UpdatePost = () => {
    const [loading,setLoading]=useState(true)
    const editor = useRef(null)
    const [blogData,setBlogData]=useState({
        title:"",
        content:""
    })
    const [currentPage,setCurrentPage] = useState(0)

    const {id} = useParams()
    
    const getPostData = async()=> {
        await axios.post("https://ecellblog-server.onrender.com/singlepost",{id:id}).then((res)=>{
            // console.log(res.data)
            setBlogData({
                title:res.data.title,
                content:res.data.content
            })
            setLoading(false)
        }).catch(err=>console.log(err))
    }

    const RenderPage = ()=> {
        if(currentPage===0) {
            return <div>
                <div className='PostForm'>
            <h1>Updating the Blog</h1>
            <label>Title</label>
            <input type="text" value={blogData.title} onChange={e=>setBlogData({...blogData,title:e.target.value})}/>
            <label htmlFor="">Blog Content</label>
            <JoditEditor
                ref={editor}
                value={blogData.content}
                onChange={e=>setBlogData({...blogData,content:e})}
            />
        </div>
            </div>
        }

        if(currentPage===1) {
            return (
                <div className='blog'>
                    <div className='blogHolder'>
                        <div>{blogData.title}</div>
                        <div className="blogCon">{parser(blogData.content)}</div>
                    </div>
                </div>
            )
        }
    }

    const [updateLoad,setUpdateLoad]=useState(false)
    const updateBlog = async()=>{
        setUpdateLoad(true)
        await axios.put("https://ecellblog-server.onrender.com/updateblog",{id:id,title:blogData.title,content:blogData.content}).then((res)=>{
            console.log(res)
            setUpdateLoad(false)
        }).catch(err=>console.log(err))
    }

    useEffect(()=>{
        getPostData()
    },[])

  return (
    <div>
        {(!loading)?<div className='form'>
        <div className='formHolder'>
            {RenderPage()}
            <div style={{display:"flex",alignItems:"center",gap:"10px",padding:"10px"}}>
                <button style={{display:currentPage==0?"none":"block"}} className='btn' onClick={()=>setCurrentPage(currentPage-1)}>Prev</button>
                <button style={{display:currentPage==1?"none":"block"}} className='btn' onClick={()=>setCurrentPage(currentPage+1)}>Next</button>
                <button style={{display:currentPage==0?"none":"block"}} className='btn' onClick={updateBlog}>{(!updateLoad)?"Update Blog":"Loading..."}</button>
            </div>
        </div>
    </div>:<div>Loading...</div>}
    </div>
  )
}
