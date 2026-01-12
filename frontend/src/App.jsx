import './App.css'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

import Login from './componants/Login'
import Register from './componants/Register'
import Dashboard from './componants/Dashboard'
import ContactP from './componants/Contact'

import Revenue from './componants/Revenue'
import Task from './componants/Task'
import Setting from './componants/Setting'
import Layout from './componants/Layout'

import ProtectedRoute from './Routes/ProtectedRoutes'
import AuthRoute from './Routes/AuthRoute'
import Chart from './componants/Chart'
import Pipeline from './componants/Pipeline'
import "./index.css"
function App() {
  return (
    <>
      <ToastContainer />

      <Routes>
        {/* 🔁 AUTH ROUTES (BLOCK IF LOGGED IN) */}
        <Route
          path="/"
          element={
            <AuthRoute>
              <Register />
            </AuthRoute>
          }
        />

        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />

        {/* 🔐 PROTECTED ROUTES */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<ContactP />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/revenue" element={<Revenue />} />
          <Route path="/task" element={<Task />} />
          <Route path="/setting" element={<Setting />} />
          
          <Route path="/chart" element={<Chart />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
