import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Form } from './components/Form'
import { Navbar } from './components/Navbar'
import {Routes,Route} from "react-router-dom"
import { Login } from './components/Login'
import { Home } from './components/Home'
import { MainPage } from './components/MainPage'
import { Update } from './components/Update'
import { UpdatePost } from './components/UpdatePost'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    <Routes>
      <Route element={<Home/>}>
        <Route path='/' element={<Form/>}/>
        <Route path="/update" element={<Update/>}/>
        <Route path='/update/:id' element={<UpdatePost/>}/>
      </Route>
    
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </>
  )
}

export default App
