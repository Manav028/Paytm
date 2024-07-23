
export function Inputbox({label,placeholder,onChange}){
    return <div>
    <h1 className="font-semibold mb-1"> {label} </h1>
    <input 
        onChange={onChange} 
        className="rounded outline-none w-full p-1.5 border-gray-200 border-2 focus:border-green-600" 
        placeholder={placeholder} /> 
    </div>
    
}


// import React from 'react';

