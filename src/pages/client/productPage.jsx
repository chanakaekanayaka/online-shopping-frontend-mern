import axios from "axios";
import { useEffect, useState } from "react"
import { LoaderIcon } from "react-hot-toast";
import Loader from "../../components/loader";
import ProductCard from "../../components/productCard";

export default function ProductPage(){

    const [products,setProducts] = useState([]);
    const [isLoading,setLoading] = useState(true);
    const [query, setQuery] = useState("")

    useEffect(
        ()=>{
            if(isLoading){
                if(query==""){

                    axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products").then(
                    (res)=>{
                        console.log(res.data);

                        setProducts(res.data)
                        setLoading(false)
                    }
                )

            }else{

                   axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products/search/"+query)
                   .then(
                    (res)=>{
                        setProducts(res.data)
                        setLoading(false)
                    }
                )

            }
                
            }

        },
        [isLoading]
    )

    return(
        <div className="w-full h-full ">
            <div className="w-full h-[100px] flex justify-center items-center">
                <input className="w-[400px] h-40px border border-gray-400 rounded-lg p-2" 
                type="text"
                placeholder="search products..."
                value={query}
                onChange={(e)=>{
                setQuery(e.target.value)
                setLoading(true)

                }
                }/>

            </div> 

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