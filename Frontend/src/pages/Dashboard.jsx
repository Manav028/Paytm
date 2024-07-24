import React, { useEffect, useState } from 'react'
import { Appbar } from '../components/Appbar'
import {Balance} from '../components/Balance'
import { Users } from '../components/Users'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Dashboard = () => {

  const [balance, setbalance] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(!token){
      navigate('/signin')
    }else{
      fetchdata(token)
    }
  },[navigate])

  async function fetchdata(token){
    const response = await axios.get("http://localhost:3000/api/v1/account/balance",{
      headers : {'Content-Type':'application/json','authorization': `Bearer ${token}`}
    })
    console.log(fetchdata)
  }


  return (
    <div>
      <Appbar/>
      <div className='p-5'>
        <Balance value={"10000"}/>
        <Users/>
      </div>
    </div>
  )
}

export default Dashboard