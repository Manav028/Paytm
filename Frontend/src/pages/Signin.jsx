import React from 'react'
import { Heading } from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { Inputbox } from '../components/InputBox'
import { Button } from '../components/Button'
import { ButtonWarning } from '../components/BottonWaring'

const Signin = () => {
  return (
    <div className='bg-slate-300 h-screen flex justify-center items-center'>
      <div className='bg-white w-3/12 h-fit flex flex-col justify-center p-8 gap-4 rounded-3xl'>
      <Heading label={"Sign In"} />
      <SubHeading message = {"Enter your information to Sign In"} />
      <Inputbox label={"Email"} placeholder={"manavpatel.uk@gmail.com"} />
      <Inputbox label={"Password"} placeholder={"Manav123"} />
      <Button label={"Sign In"} />
      <ButtonWarning label={"Don't have an account ?"} buttonlabel={"Sign up"} to={"/signup"}/>
      </div>
    </div>    
  )
}

export default Signin