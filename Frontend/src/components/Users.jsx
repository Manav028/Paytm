import axios from "axios"
import React , {useState} from "react"
import { useNavigate } from "react-router-dom";



export function Users(){
    
    const [searchname, setsearchname] = useState("")
    const [users,setusers] = useState([]);

    async function searchhandler(){
        const response = await axios.get(`http://localhost:3000/api/v1/user/search?filter=${searchname}`,
            {headers:{"Content-Type":"application/json"}}
        )
        setusers(response.data.user)
    }
    

    return <div className="flex flex-col gap-1">
        <div>
            Users
        </div>
    <div className="flex gap-3">
        <input onChange={(e)=>{setsearchname(e.target.value)}} placeholder="Search Name" className="border-gray-300 border-2 w-11/12 p-1 rounded"/> 
        <button className="bg-black text-white p-2 rounded" onClick={searchhandler}> SEARCH </button>
    </div>
    <div>
    {users.length > 0 ? (users.map((user,index) => (
                    <User key={user._id} user={user} />
    ))) : (<h1> No User Found </h1>) }
    </div>
    </div>
}

function User({user}){

    const firstletter = user.firstname.charAt(0).toUpperCase()
    const navigation = useNavigate();

    return <div className="flex justify-between items-center">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {firstletter}           
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstname} {user.lastname} 
                </div>
            </div>
        </div>
        <div>
            <button className="bg-black text-white p-2 rounded" onClick={()=>{navigation("/SendMoney?id="+user._id+"&name="+user.firstname)}}>
                Send Money
            </button>
        </div>
    </div>
}