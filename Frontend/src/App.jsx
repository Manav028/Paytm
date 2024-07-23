import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import SendMoney from "./pages/SendMoney"
import Dashboard from "./pages/Dashboard"


function App() {
  const [count, setCount] = useState(0  )

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route  path='/signin' element={<Signin/>}></Route>
      <Route  path='/signup' element={<Signup/>}></Route>
      <Route  path='/sendMoney' element={<SendMoney/>}></Route>
      <Route  path='/dashboard' element={<Dashboard/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
