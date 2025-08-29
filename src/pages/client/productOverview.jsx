import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom"
import Loader from "../../components/loader";
import ImagesSlider from "../../components/imageSlider";

export default function ProductOverview(){
const params = useParams();
const [product , setProduct] = useState(null);
const [status , setState] = useState("loading");

useEffect(
    ()=>{
        if(status == "loading"){
            axios.get(import.meta.env.VITE_BACKEND_URL + `/api/products/${params.productID}`).then(
                (res)=>{
                    setProduct(res.data);
                    setState("success");
                }
            ).catch(
                (error)=>{
                    setState("error")
                    toast.error("Faild to fetch product details.")
                }
            )
        }

    },[status]
)

return (
    <div className="w-full h-full ">
        {
          status == "loading" && <Loader></Loader>

        }

        {
            status == "success" && <div className="w-full h-full flex flex-row">
                <div className="w-[49%] h-full flex flex-col justify-center items-center">
                    <ImagesSlider images={product.image}></ImagesSlider>
                </div>
                <div className="w-[51%] h-full bg-rose-200 pt-[30px] flex flex-col items-center ">
                    <h1 className="text-2xl font-bold ">{product.productName}<span className="font-light ml-[20px] ">{product.altNames.join("|")}</span></h1>
                    <p className="text-lg mt-[20px] ">{product.description}</p>

                    <div className="w-full flex flex-col items-center mt=[20px]">
                        {
                            product.labelledPrice > product.price ?
                            <div>
                                <span className="text-2xl font-semibold line-through mr-[20px]">LKR.{product.labelledPrice}</span>
                                <span className="text-3xl font-bold ">LKR.{product.price}</span>
                            </div>
                            :
                            <div>
                                <span className="text-3xl font-bold">LKR.{product.price}</span>
                            </div>
                        }


                    </div>
                    <div className="w-full flex flex-row justify-center items-center mt-[20px] gap-[15px]">
                        <button className="w-[200px] h-[30px] cursor-pointer rounded-xl shadow-2xl text-amber-50 bg-blue-500 hover:bg-white hover:text-blue-700">Add Cart</button>
                        <button className="w-[200px] h-[30px] cursor-pointer rounded-xl shadow-2xl text-amber-50 bg-blue-500  hover:bg-white hover:text-blue-700" >Buy Now</button>

                    </div>

                </div>
            </div>

        }

        {
            status == "error" && <div>Error loading product</div>

        }
           
        
        
        
       

    
        
    </div>
)

}