export function Button({label,onClick}){
    return <button onClick={onClick} className="bg-black text-white py-1 pb-2 font-bold text-2xl rounded"> {label} </button>
}