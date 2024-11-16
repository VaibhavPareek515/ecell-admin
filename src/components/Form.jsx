import React, { useRef, useState } from 'react'
import JoditEditor from 'jodit-react';
import parser from "html-react-parser"
import axios from "axios"

export const Form = () => {
    const editor = useRef(null)
    const [loading,setLoading] = useState(false)
    const [title,setTitle]=useState("")
    const [content,setContent] = useState("")
    const [currentPage,setCurrentPage] = useState(0)

    const AddPost = async()=> {
        setLoading(true)
        await axios.post("https://ecellblog-server.onrender.com/addpost",{title:title,content:content}).then((res)=>{
            console.log(res)
        }).catch(err=>console.log(err)).finally(()=>{
            setLoading(false)
        })
    }

    const RenderPage = ()=> {
        if(currentPage===0) {
            return <div>
                <div className='PostForm'>
            <h1>Add a Blog</h1>
            <label>Title</label>
            <input type="text" value={title} onChange={e=>setTitle(e.target.value)}/>
            <label htmlFor="">Blog Content</label>
            <JoditEditor
                ref={editor}
                value={content}
                onChange={newValue=>setContent(newValue)}
            />
        </div>
            </div>
        }

        if(currentPage===1) {
            return (
                <div className='blog'>
                    <div className='blogHolder'>
                        <div>{title}</div>
                        <div className="blogCon">{parser(content)}</div>
                    </div>
                </div>
            )
        }
    }
  return (
    <div className='form'>
        <div className='formHolder'>
            {RenderPage()}
            <div style={{display:"flex",alignItems:"center",gap:"10px",padding:"10px"}}>
                <button style={{display:currentPage==0?"none":"block"}} className='btn' onClick={()=>setCurrentPage(currentPage-1)}>Prev</button>
                <button style={{display:currentPage==1?"none":"block"}} className='btn' onClick={()=>setCurrentPage(currentPage+1)}>Next</button>
                <button style={{display:currentPage==0?"none":"block"}} className='btn' onClick={AddPost}>{loading?"Loading...":"Post Blog"}</button>
            </div>
        </div>
    </div>
  )
}
