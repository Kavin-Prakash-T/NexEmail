import React, { useContext } from 'react'
import { useAuth } from './context/authContext'
import {BrowserRouter as Router, Routes, Route }  from "react-router-dom"
import { Toaster } from 'react-hot-toast'
import {LandingPage} from "./pages/LandingPage"

function App() {

  const { user, loading } = useAuth()

  if(loading) {
    return <p>Loading...</p>
  }

  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
         <Route path="/" element={<LandingPage/>}/>
      </Routes>
    </Router>
  )
}

export default App
