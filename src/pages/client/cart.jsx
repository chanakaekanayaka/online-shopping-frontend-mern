import { useState } from "react"
import { getCart } from "../../utils/cart.js"

export default function CartPage(){
    const [cart,setCart]= useState(getCart());
    console.log(cart)

    return(

        <div className="w-full h-screen flex flex-col py-[40px] items-center">
            {

                cart.map(
                    (item)=>{
                        return (
                            <div key={item.productId} className="w-[80px] h-[100px] m-[10px] shadow-2xl flex flex-row items-center">
                                <img src={item.image} className="w-[100px] h-[100px] object-cover"/>
                            </div>
                              
                            
                        )
                    }
                )

            }
           
        </div> 
    )
}