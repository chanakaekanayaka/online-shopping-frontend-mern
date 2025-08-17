import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function ProductsAdmin(){

    return(
        <div className="w-full h-screen border-[3px] bg-rose-500"> 
            <Link to={"/admin/addNewProduct"} className="fixed bottom-[20px] right-[20px] border-2  px-[10px] text-black bg-amber-300 rounded-full cursor-pointer shadow-2xl">  
                <BiPlus className="text-3xl text-shadow-amber-50 "></BiPlus>  
                

            </Link> 
        </div>
    )
}   