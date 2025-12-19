import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader";
import ImagesSlider from "../../components/imageSlider";
import { addToCart, getCart } from "../../utils/cart";

export default function ProductOverview() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [status, setState] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    if (status == "loading") {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + `/api/products/${params.productID}`)
        .then((res) => {
          setProduct(res.data);
          setState("success");
        })
        .catch((error) => {
          setState("error");
          toast.error("Failed to fetch product details.");
        });
    }
  }, [status]);

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-200">
      {status == "loading" && (
        <div className="w-full h-[80vh] flex justify-center items-center">
          <Loader />
        </div>
      )}

      {status == "success" && (
        <div className="w-full flex flex-col lg:flex-row p-4 md:p-10 gap-10">
          {/* Left Side: Image Slider */}
          <div className="w-full lg:w-1/2 flex justify-center items-start">
            <ImagesSlider images={product.image} />
          </div>

          {/* Right Side: Product Details */}
          <div className="w-full lg:w-1/2 flex flex-col space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {product.productName}
              </h1>
              <div className="flex flex-wrap gap-2">
                {product.altNames.map((name, index) => (
                  <span key={index} className="text-sm text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                    {name}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
              {product.description}
            </p>

            {/* Pricing */}
            <div className="flex flex-col space-y-1">
              {product.labelledPrice > product.price ? (
                <div className="flex items-center gap-4">
                  <span className="text-xl text-slate-500 line-through">
                    LKR {product.labelledPrice.toFixed(2)}
                  </span>
                  <span className="text-4xl font-bold text-blue-500">
                    LKR {product.price.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-4xl font-bold text-blue-500">
                  LKR {product.price.toFixed(2)}
                </span>
              )}
              <p className="text-green-500 text-sm font-medium">In Stock & Ready to Ship</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                className="flex-1 h-14 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl border border-slate-700 transition-all active:scale-95 shadow-lg"
                onClick={() => {
                  addToCart(product, 1);
                  toast.success("Product added to cart");
                  console.log(getCart());
                }}
              >
                Add to Cart
              </button>
              
              <button
                className="flex-1 h-14 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all active:scale-95 shadow-lg shadow-blue-900/20"
                onClick={() => {
                  navigate("/checkout", {
                    state: {
                      items: [
                        {
                          productId: product.productID,
                          quantity: 1,
                          name: product.productName,
                          image: product.image[0],
                          price: product.price,
                        },
                      ],
                    },
                  });
                }}
              >
                Buy It Now
              </button>
            </div>
          </div>
        </div>
      )}

      {status == "error" && (
        <div className="w-full h-[50vh] flex flex-col justify-center items-center">
          <p className="text-red-500 text-xl">Error loading product details.</p>
          <button onClick={() => setState("loading")} className="mt-4 text-blue-500 underline">Try Again</button>
        </div>
      )}
    </div>
  );
}