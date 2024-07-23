import React from 'react'
import { Appbar } from '../components/Appbar'
import {Balance} from '../components/Balance'
import { Users } from '../components/Users'

const Dashboard = () => {
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