import React from 'react'
import { Heading } from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { Inputbox } from '../components/InputBox'
import { Button } from '../components/Button'
import { ButtonWarning } from '../components/BottonWaring'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const Signin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [message, setmessage] = useState("");
  const navigate = useNavigate();

  return (
    <div className='bg-slate-300 h-screen flex justify-center items-center'>
      <div className='bg-white w-3/12 h-fit flex flex-col justify-center p-8 gap-4 rounded-3xl'>
      <Heading label={"Sign In"} />
      <SubHeading message = {"Enter your information to Sign In"} />
      <Inputbox onChange={(e)=>{setemail(e.target.value)}} label={"Email"} placeholder={"manavpatel.uk@gmail.com"}/>
      <Inputbox onChange={(e)=>{setpassword(e.target.value)}} label={"Password"} placeholder={"Manav123"} type={"password"} />
      <Button onClick={async()=>{
        try{
          setmessage("")
          const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
            user:{
              email,
              password
            }
          },{
            headers : {'Content-Type':'application/json'}
          });
          if(response.data.token!==undefined){
            localStorage.setItem("token",response.data.token)
            setmessage(response.data.msg)
            navigate("/dashboard")
          }else{
            
            setmessage(response.data.msg)
          }
        }catch(error){
          console.log(error.message)
        } 

      }} label={"Sign In"} />
      <ButtonWarning label={"Don't have an account ?"} buttonlabel={"Sign up"} to={"/signup"}/>
      {message && <h1>{message}</h1>}
      </div>
    </div>    
  )
}

export default Signin