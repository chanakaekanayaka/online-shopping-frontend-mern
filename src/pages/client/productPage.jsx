import axios from "axios";
import { useEffect, useState } from "react"
import { LoaderIcon } from "react-hot-toast";
import Loader from "../../components/loader";
import ProductCard from "../../components/productCard";

export default function ProductPage(){

    const [products,setProducts] = useState([]);
    const [isLoading,setLoading] = useState(true);

    useEffect(
        ()=>{
            if(isLoading){
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products").then(
                    (res)=>{
                        console.log(res.data);

                        setProducts(res.data)
                        setLoading(false)
                    }
                )
            }

        },
        [isLoading]
    )

    return(
        <div className="w-full h-full ">
            {
                isLoading ? <Loader></Loader> :
                
                <div className="w-full  flex flex-wrap gap-[40px] justify-center items-center py-[40px]">{
                    products.map(
                        (product)=>{
                            return(
                                <ProductCard key={product.productID} product={product}/>
                                
                            )

                    })
                }
                </div>

                
                
            }
            
        </div>
    )
}