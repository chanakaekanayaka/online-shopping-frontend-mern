import {  Link, Route, Routes, useNavigate } from "react-router-dom";
import { FaBox } from "react-icons/fa";
import { GiBoxUnpacking } from "react-icons/gi";
import { FaUserCog } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import ProductsAdmin from "./Admin/productsAdmin";
import AddnewProductAdminPage from "./Admin/newProductAdminPage";
import UpdateProduct from "./Admin/updateProduct";
import OrdersPageAdmin from "./Admin/ordersPageAdmin";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import toast from "react-hot-toast";
import axios from "axios";


export default function Admin(){

    const navigate = useNavigate();
    const [adminValidated, setAdminValidated] = useState(false);

    useEffect(
        ()=>{
            const token = localStorage.getItem("token");
            if(token==null){
                toast.error("Your are not login ");
                navigate("/login")
            }else{
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/users/",{
                    headers: {
                        Authorization:`Bearer ${token}`,
                    },
                }).then((Response)=>{
                    if(Response.data.role=="admin"){
                        setAdminValidated(true);
                    }else{
                        toast.error("You are not authorized")
                        navigate("/login");
                    }
                }).catch(()=>{
                    toast.error("You are not authorized");
                    navigate("/login")
                });
            }
        }

    ,[]);

    return(
      
      <div className="h-full w-screen bg-amber-50 flex">
            {adminValidated?<>
                <div className="h-full w-[300px] bg-amber-300  flex flex-col  items-center">
                <span className="text-3xl font-extrabold">Admin Pannel</span>
                <Link className="  flex-row border flex p-[5px] justify-center items-center  w-full h-[50px] text-2xl text-white bg-blue-400 gap-[35px]"  to="/admin/products"><FaBox/> Products </Link>
                <Link className="  flex-row border flex p-[5px] justify-center items-center  w-full h-[50px] text-2xl text-white bg-blue-400 gap-[35px]"  to="/admin/orders"><GiBoxUnpacking/> Orders </Link>
                <Link className="  flex-row border flex p-[5px] justify-center items-center  w-full h-[50px] text-2xl text-white bg-blue-400 gap-[35px]"  to="/admin/users"><FaUserCog/> Users </Link>
                <Link className="  flex-row border flex p-[5px] justify-center items-center  w-full h-[50px] text-2xl text-white bg-blue-400 gap-[35px]"  to="/admin/settings"><IoSettingsSharp className="text-blue-950"/> Setting  </Link>
        
                
            </div>
            <div className="h-full w-[calc(100%-300px)] bg-amber-900">
            <Routes > 
                <Route path="/" element={<h1>Admin home</h1>}></Route>
                <Route path="/products" element={<ProductsAdmin></ProductsAdmin>}/>
                <Route path="/addNewProduct" element={<AddnewProductAdminPage></AddnewProductAdminPage>}></Route>
                <Route path="/updateProduct" element={<UpdateProduct></UpdateProduct>}></Route>
                <Route path="/orders" element={<OrdersPageAdmin></OrdersPageAdmin>}/>
            </Routes>
            </div>
        </>:<Loader/>}
            

           

     </div>
        
        
    );
}

//testing new device