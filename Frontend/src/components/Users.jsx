export function Users(){
    return <div className="flex flex-col gap-1">
    <div>
        Users
    </div>
    <input placeholder="Search Name" className="border-gray-300 border-2 w-full p-1 rounded"/> 
    <div>
        <User/>
    </div>
    </div>
}

function User(){
    return <div className="flex justify-between items-center">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    M
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    Manav Patel
                </div>
            </div>
        </div>
        <div>
            <button className="bg-black text-white p-2 rounded">
                Send Money
            </button>
        </div>
    </div>
}