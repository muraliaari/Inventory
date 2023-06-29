import { useState } from 'react'
import {Outlet} from 'react-router-dom'
import './App.css'

import Home from './components/Home'
import Nav from './parts/Nav'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
      <Nav/>
    
      <Outlet/>
      
    </>
  )
}

export default App
