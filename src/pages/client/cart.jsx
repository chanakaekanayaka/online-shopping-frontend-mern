import { useState } from "react"
import { addToCart, getCart, getTotal } from "../../utils/cart.js"
import { TbTrash } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export default function CartPage(){
    const [cart,setCart]= useState(getCart());
    console.log(cart)
    const navigate = useNavigate();

    return(

        <div className="w-full h-screen flex flex-col py-[40px] items-center ">
            {

                cart.map(
                    (item)=>{
                        return (
                            <div key={item.productId} className="w-[800px] h-[100px] m-[10px] shadow-2xl flex flex-row items-center bg-red-500 relative">
                                <img src={item.image} className="w-[100px] h-[100px] object-cover"/>
                                <div className="w-[320px] h-full bg-red-400 flex flex-col justify-center pl-[10px]">
                                    <span className="text-white font-bold ">{item.name}</span>
                                    <span className="text-white font-semibold"> {item.price.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2})}</span>

                                </div>
                                <div className="w-[190px] h-full flex flex-row justify-center items-center">
                                    <button className="flex justify-center items-center w-[30px] rounded-lg bg-blue-600 text-white cursor-pointer hover:bg-blue-700"
                                    onClick={()=>{
                                        addToCart(item,-1);
                                        setCart(getCart());
                                    }}>-</button>
                                    <span className="mx-[10px]">{item.quantity}</span>
                                    <button className="flex justify-center items-center w-[30px] rounded-lg bg-blue-600 text-white cursor-pointer hover:bg-blue-700"
                                    onClick={()=>{
                                        addToCart(item,1);
                                        setCart(getCart());
                                    }}>+</button>

                                </div>
                                <div className="w-[190px] h-full flex justify-center items-center pr-[50px] bg-amber-400">
                                    <span className="font-semibold pr-4">{(item.quantity*item.price).toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2})}</span>
                                </div>
                                <button className="w-[30px] h-[30px] absolute right-[-40px] cursor-pointer bg-red-300 rounded-full flex justify-center items-center hover:bg-red-700"
                                onClick={()=>{
                                    addToCart(item, -item.quantity);
                                    setCart(getCart());
                                }} ><TbTrash/></button>
                                
                            </div>
                            
                              
                            
                        )
                    }
                )

            }
            <div className="w-[800px] h-[100px] m-[10px] P-[10PX] shadow-2xl flex flex-row items-center justify-end relative">
                <span className="font-semibold text-2xl mr-[20px]">
                   Total:{getTotal().toLocaleString('en-US',{minimumFractionDigits:2, maximumFractionDigits:2})}
                </span>
                <button className="absolute left-[10px] w-[150px] h-[50px] cursor-pointer rounded-lg shadow-2xl bg-blue-500 border-[2px]
                border-blue-700 text-white hover:bg-white hover:text-blue-700"
                onClick={()=>{
                    navigate("/checkout",{state: {items: cart}});
                }}>
                    Checkout
                </button>
            </div>
           
        </div> 
    )
}