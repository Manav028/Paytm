import React, { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [balance, setbalance] = useState(0);
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    } else {
      fetchdata(token);
    }
  }, [navigate]);

  async function fetchdata(token) {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/account/balance",
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      const userdata = await axios.get("http://localhost:3000/api/v1/user/userdata",{
        headers : {"Content-Type":"application/json",authorization:`Bearer ${token}`}
      })
      
      setbalance(response.data.Balance)
      setfirstname(userdata.data.user.firstname)
      setlastname(userdata.data.user.lastname)

    } catch {
      console.log("Error in fetching data");
    }
  }

  return (
    <div>
      <Appbar firstletter={firstname.charAt(0).toUpperCase()} />
      <div className="p-5">
        <Balance value={balance} />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
