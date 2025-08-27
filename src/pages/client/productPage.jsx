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
        <div className="w-full h-full bg-purple-400 flex ">
            {
                isLoading ? <Loader></Loader> :
                
                   
                    products.map(
                        (product)=>{
                            return(
                                <ProductCard></ProductCard>
                                
                            )

                    })
                   

                
                
            }
            
        </div>
    )
}