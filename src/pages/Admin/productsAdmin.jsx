import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";



export default function ProductsAdmin(){

   const [product,setProduct] = useState([]);
   const navigate = useNavigate();
   const [isLoading,setisLoading] = useState(true);

   useEffect(
    ()=>{
      if(isLoading){
        axios.get(import.meta.env.VITE_BACKEND_URL +"/api/products").then(
        (res)=>{
          setProduct(res.data);
          setisLoading(false);

        }
      )

      }
      

    },
    [isLoading]
   )



    return(
        <div className="w-full h-screen border-[3px] bg-rose-500">  

        {
          isLoading ? (<Loader></Loader>) :
          (
            <table >
              <thead>
                <tr>
                <td className="p-[10px]">Product ID</td>
                <td className="p-[10px]">Product Name</td> 
                <td className="p-[10px]">Alt Names</td>
                <td className="p-[10px]">Labeled Price</td>
                <td className="p-[10px]">Price</td>
                <td className="p-[10px]">Images</td>
                <td className="p-[10px]">Description</td>
                <td className="p-[10px]">Stock</td>
                <td className="p-[10px]">Is Available</td>
                <td className="p-[10px]">Category</td>
                <td className="p-[10px]">Action</td>

                </tr>
                </thead>

              <tbody>
                {
                  product.map(
                    (product,index)=>{
                      return(
                      <tr key={index}>
                        <td className="p-[10px]">{product.productID}</td>
                        <td className="p-[10px]">{product.productName}</td>
                        <td className="p-[10px]">{product.altNames}</td>
                        <td className="p-[10px]">{product.labelledPrice}</td>
                        <td className="p-[10px]">{product.price}</td>
                        <td className="p-[10px]">
                          <img src={product.image[0] } className="w-[40px] h-[40px] rounded-[10px] ">
                          </img>
                          </td>
                        <td className="p-[10px]">{product.description}</td>
                        <td className="p-[10px]">{product.stock}</td>
                        <td className="p-[10px]">{product.isAvilable}</td>
                        <td className="p-[10px]">{product.category}</td>
                        <td className="p-[10px] flex justify-center items-center">
                          <BiTrash className="bg-red-500 p-[7px] text-3xl rounded-full text-amber-50 cursor-pointer " onClick={
                            ()=>{
                              const token = localStorage.getItem("token");
                              if(token == null){
                                navigate("/login");
                                return;

                              }
                              axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/products/"+ product.productID,
                                {
                                  headers:{
                                    Authorization: `Bearer ${token}`
                                  }
                                }
                              ).then(
                                (res)=>{
                                  console.log("product deleted sucessfully")
                                  console.log(res.data);
                                  toast.success("Product deleted sucessfully");
                                  setisLoading(true)
                                }
                              ).catch(
                                (error)=>{
                                  console.error("Error deleting product:",error);
                                  toast.error("Faild to delete product");
                                }
                                )
                            }
                            }

                          />
                          <BiEdit className="bg-green-700 p-[7px] text-3xl rounded-full text-amber-50 cursor-pointer " onClick={
                            ()=>{
                              navigate("/admin/updateProduct", 
                                {
                                  state : product
                                }
                              )
                            }
                          }/>
                        </td>
                </tr>
                      )
                    }
                  )
                }
            

              </tbody>
            </table>

          )
        }

            
            
            <Link to={"/admin/addNewProduct"} className="fixed bottom-[20px] right-[20px] border-2  px-[10px] text-black bg-amber-300 rounded-full cursor-pointer shadow-2xl">  
                <BiPlus className="text-3xl text-shadow-amber-50 "></BiPlus>  
                

            </Link> 
        </div>
    )
}  