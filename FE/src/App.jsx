import { useState } from 'react'
import {Outlet} from 'react-router-dom'
import './App.css'

import Nav from './parts/Nav'



function App() {
  

  return (
    <>
    
      <Nav/>
    
      <Outlet/>
      
    </>
  )
}

export default App
