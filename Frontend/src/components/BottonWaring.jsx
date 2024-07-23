import { Link } from "react-router-dom"

export function ButtonWarning({label,buttonlabel,to}){
    return <div className="flex justify-center gap-2">
    <p> {label} </p>
    <button className="underline font-bold"> <Link to={to}> {buttonlabel} </Link> </button>
    </div>
}