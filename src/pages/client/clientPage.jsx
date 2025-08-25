import { Route, Routes } from "react-router-dom";
import Header from "../../components/header";
import { TbH1 } from "react-icons/tb";

export default function ClientWebPage(){

    return(
        <div className="w-full h-screen max-h-screen ">
            <Header></Header>
            <div className="w-full h-[calc(100%-100px)] bg-yellow-200">
                <Routes path="/">
                    <Route path="/" element={<h1>Home page</h1>}></Route>
                    <Route path="/products" element={<h1>Products</h1>}></Route>
                    <Route path="/reviews" element={<h1>Reviews</h1>}></Route>
                    <Route path="/contactus" element={<h1>contact Us</h1>}></Route>
                    <Route path="/aboutus" element={<h1>About Us</h1>}></Route>
                    <Route path="/*" element={<h1>404 NOT FOUND</h1>}></Route>
                </Routes>

            </div>
            

        </div>

    )

    


}