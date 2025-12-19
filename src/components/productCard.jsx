import { Link } from "react-router-dom";

export default function ProductCard(props) {
  const product = props.product;

  return (
    <Link to={"/overview/" + product.productID}>
      <div className="w-[300px] h-[420px] flex flex-col bg-slate-900 border border-slate-800 shrink-0 shadow-2xl rounded-2xl overflow-hidden hover:border-blue-500/50 hover:scale-[1.02] transition-all duration-300 group">
        
        {/* Product Image */}
        <img 
          src={product.image[0]} 
          className="w-full h-[275px] object-cover group-hover:opacity-90 transition-opacity" 
          alt={product.productName}
        />

        {/* Product Details */}
        <div className="w-full h-[145px] flex flex-col p-4">
          
          {/* Product ID */}
          <span className="text-slate-500 text-[13px] font-medium tracking-wide">
            ID: {product.productID}
          </span>

          {/* Product Name & Category */}
          <h1 className="text-slate-100 text-lg font-bold truncate mt-1">
            {product.productName}{" "}
            <span className="text-slate-400 text-[12px] font-normal block">
              {product.category}
            </span>
          </h1>

          {/* Pricing Section */}
          <div className="mt-auto">
            {product.labelledPrice > product.price ? (
              <p className="flex items-center gap-2">
                <span className="text-slate-500 line-through text-sm">
                  LKR {product.labelledPrice.toFixed(2)}
                </span>
                <span className="text-blue-400 text-xl font-bold">
                  LKR {product.price.toFixed(2)}
                </span>
              </p>
            ) : (
              <span className="text-blue-400 text-xl font-bold">
                LKR {product.price.toFixed(2)}
              </span>
            )}
          </div>

        </div>
      </div>
    </Link>
  );
}