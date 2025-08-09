import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function Admin(){

    return(
      
            <div className="h-full w-screen bg-amber-50 flex">
            <div className="h-full w-[300px] bg-amber-300"></div>
            <div className="h-full w-[calc(100%-300px)] bg-amber-900">
            <Routes > 
                <Route path="/" element={<h1>Admin home</h1>}></Route>
                <Route path="/products" element={<h1>Products details</h1>}/>
                <Route path="/orders" element={<h1>Order details </h1>}/>
            </Routes>
            </div>

           

        </div>
        
        
    );
}