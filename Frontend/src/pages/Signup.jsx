import React from 'react'
import { Heading } from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { Inputbox } from '../components/InputBox'
import { Button } from '../components/Button'
import { ButtonWarning } from '../components/BottonWaring'
import axios from 'axios'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const Signup = () => {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className='bg-slate-300 h-screen flex justify-center items-center'>
      <div className='bg-white w-3/12 h-fit flex flex-col justify-center p-8 gap-4 rounded-3xl'>
        <Heading label={"Sign Up"} />
        <SubHeading message={"Enter your information to create an account"} />
        <Inputbox onChange={(e) => { setfirstname(e.target.value) }} label={"First Name"} placeholder={"Manav"} />
        <Inputbox onChange={(e) => { setlastname(e.target.value) }} label={"Last Name"} placeholder={"Patel"} />
        <Inputbox onChange={(e) => { setemail(e.target.value) }} label={"Email"} placeholder={"manavpatel.uk@gmail.com"} />
        <Inputbox onChange={(e) => { setpassword(e.target.value) }} label={"Password"} placeholder={"Manav123"} />
        <Button onClick={async () => {
          console.log({ firstname, lastname, email, password })
          try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
              user: {
                firstname,
                lastname,
                email,
                password
              },
            },{
              headers: {'Content-Type':'application/json'}
            });
            localStorage.setItem("token",response.data.token);
            console.log(response.data);
            navigate("/dashboard");
          }
          catch (error) {
            console.error('Error during sign up : ', error.response ? error.response.data : error.message)
          }
        }} label={"Sign Up"} />
        <ButtonWarning label={"Already have a account ?"} buttonlabel={"Sign In"} to={"/signin"} />
      </div>
    </div>
  )
}

export default Signup