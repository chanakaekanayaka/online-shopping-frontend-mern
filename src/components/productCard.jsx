import { Link } from "react-router-dom";


export default function ProductCard(props){
    const product = props.product;

    return(
        <Link to={"/overview/"+product.productID}>
          <div className="w-[300px] h-[420px] flex flex-col  bg-amber-200  shrink-0 shadow-2xl rounded-2xl overflow-hidden  "> 
            <img src={product.image[0]} className="w-full h-[275px] object-cover"></img>
            <div className="w-full h-[125px] flex flex-col p-[4px]">
                <span className="text-gray-700 text-[15px]">{product.productID}</span>
                <h1 className="text-lg font-bold">
                    {product.productName} {" "} 
                    <span className="text-gray-600 text-[13px]">{product.category}</span>
                </h1>
                <div>
                    {
                        product.labelledPrice > product.price ? (
                            <p>
                                <span className="line-through mr-[10px]">{product.labelledPrice}</span>
                                 <span className="text-lg">{product.price.toFixed(2)}</span>
                            </p>
                        ) :(
                            <span className="text-lg">{product.price.toFixed(2)}</span>
                        )
                        
                    }
                </div>

            </div>

        </div>
        </Link>


        
    );
}  