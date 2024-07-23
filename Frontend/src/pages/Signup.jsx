import React from 'react'
import { Heading } from '../components/Heading'
import { SubHeading } from '../components/SubHeading'

const Signup = () => {
  return (
    <div className='bg-slate-300 h-screen flex justify-center items-center'>
      <div className='bg-white w-3/12 h-fit flex flex-col justify-center px-5 py-10 gap-4'>
      <Heading label={"Sign Up"} />
      <SubHeading message = {"Enter your information to create an account"} />
      </div>
    </div>    
  )
}

export default Signup