import { useState } from 'react'
import Landing from './pages/Landing'
import Layout from './components/Layout'
import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'


function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path='login' element={<Login />} />
      </Route>
    </Routes>
    
    
  )
}

export default App
