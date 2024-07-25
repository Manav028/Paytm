import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const SendMoney = () => {

    const [searchParams] = useSearchParams();
    const toid = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setamount] = useState(0)
    const navigate = useNavigate();
    const [transfer, settransfer] = useState(false)

    return <div className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div
                className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
            >
                <div className="flex flex-col space-y-1.5 p-6">
                    <h2 className="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div className="p-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                            <span className="text-2xl text-white">{name.charAt(0).toUpperCase()}</span>
                        </div>
                        <h3 className="text-2xl font-semibold"> {name} </h3>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"

                            >
                                Amount (in pound(£))
                            </label>
                            <input
                                onChange={(e) => { setamount(e.target.value) }}
                                type="number"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                id="amount"
                                placeholder="Enter amount"
                            />
                        </div>
                        <button onClick={async () => {
                            try {
                                await axios.post("http://localhost:3000/api/v1/account/transfer",
                                    { to: toid, amount: amount },
                                    { headers: { "Content-Type": "application/json", authorization: "Bearer " + localStorage.getItem("token") } })
                                    setamount("0");
                                    settransfer(true)
                                    setTimeout(() => {
                                    settransfer(false)
                                    navigate("/dashboard")
                                }, 3000)
                            }
                            catch (error) {
                                console.log(error)
                            }
                        }}
                            className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                            Initiate Transfer
                        </button>
                        {transfer && <div className="text-green-500 text-center mt-4">
                                    Transfer successful!
                                </div>}
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default SendMoney