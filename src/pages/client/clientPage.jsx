import { Route, Routes } from "react-router-dom";
import Header from "../../components/header";
import { TbH1 } from "react-icons/tb";
import ProductPage from "./productPage";
import ProductOverview from "./productOverview";


export default function ClientWebPage(){

    return(
        <div className="w-full h-screen max-h-screen ">
            <Header></Header>
            <div className="w-full h-[calc(100%-100px)] "> 
                <Routes path="/">
                    <Route path="/" element={<h1>Home page</h1>}></Route>
                    <Route path="/products" element={<ProductPage></ProductPage>}></Route>
                    <Route path="/reviews" element={<h1>Reviews</h1>}></Route>
                    <Route path="/contactus" element={<h1>contact Us</h1>}></Route>
                    <Route path="/aboutus" element={<h1>About Us</h1>}></Route>
                    <Route path="/*" element={<h1>404 NOT FOUND</h1>}></Route>
                    <Route path="/overview/:productID" element={<ProductOverview></ProductOverview>}></Route>
                </Routes>

            </div>
          
             
        </div>
        

    )

    


}