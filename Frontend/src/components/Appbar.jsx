import { useNavigate } from "react-router-dom"

export const Appbar = ({firstletter}) => {

    const navigate = useNavigate();

    return <div className="shadow h-14 flex justify-between px-4">
        <div className="flex flex-col justify-center h-full font-bold">
            PayTM App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl font-bold">
                    {firstletter}
                </div>
            </div>
            <button onClick={()=>{localStorage.removeItem("token"); navigate("/signin")}} className="bg-black text-white rounded my-2 px-2"> LOGOUT </button>
        </div>
    </div>
}