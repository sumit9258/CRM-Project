import { useState } from 'react'
import './App.css'
import Login from './componants/Login'
import Register from './componants/Register'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './componants/Dashboard'
import ContactP from './componants/Contact'
import Pipeline from './componants/pipeline'
import Revenue from './componants/Revenue'
import Layout from './componants/Layout'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import Task from './componants/Task'

function App() {

  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<Register/>}></Route>
      <Route path='/login' element={ <Login/>}></Route>
      <Route element={<Layout/>}>
      <Route path='/dashboard' element={ <Dashboard/>}></Route>
      <Route path='/contact' element={ <ContactP/>}></Route>
      <Route path='/pipeline' element={ <Pipeline/>}></Route>
      <Route path='/revenue' element={ <Revenue/>}></Route>
      <Route path='/task' element={ <Task/>}></Route>
      </Route>
    </Routes>
    
   
   
    </>
  )
}

export default App
