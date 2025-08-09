import { useState } from "react";

export default function TestPage(){
    const[count,setCount] = useState(300);

    function increment(){
        setCount(count + 1)
    }

    function decrement(){
        setCount(count -1)
    }

    return(
        <div className="h-full w-screen bg-amber-200 flex justify-center items-center"  >
            <div className="w-[400px] h-[400px] bg-blue-300 flex flex-col justify-center items-center">
                <h1 className="text-5xl font-bold">{count}</h1>
                <div className="w-[300px] h-[200px] bg-blue-600 border-2 flex justify-center items-center">
                   <button  onClick={increment} className="w-[80px] h-[50px] bg-amber-50 flex justify-center items-center border-2 border-b-cyan-950 margin rounded-full text-3xl mx-2">+</button>
                   <button onClick={decrement} className="w-[80px] h-[50px] bg-amber-50 flex justify-center items-center border-2 border-b-cyan-950 rounded-full text-3xl mx-2">-</button>
                </div>

            </div>

        </div> 

    );

}