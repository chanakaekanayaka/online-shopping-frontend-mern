import { useState } from "react"
import { addToCart, getCart, getTotal } from "../../utils/cart.js"
import { TbTrash } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
    const [cart, setCart] = useState(getCart());
    const navigate = useNavigate();

    return (
        <div className="w-full min-h-screen flex flex-col py-10 items-center bg-slate-950 text-slate-200 px-4">
            <h1 className="text-3xl font-bold mb-8 text-white">Your <span className="text-blue-500">Cart</span></h1>

            {cart.length > 0 ? (
                <>
                    <div className="w-full max-w-4xl space-y-4">
                        {cart.map((item) => (
                            <div key={item.productId} className="w-full h-auto md:h-28 flex flex-col md:flex-row items-center bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl p-4 md:p-0">
                                
                                {/* Product Image */}
                                <img src={item.image} className="w-20 h-20 md:w-28 md:h-full object-cover rounded-lg md:rounded-none" alt={item.name} />

                                {/* Product Info */}
                                <div className="flex-1 flex flex-col justify-center px-6 text-center md:text-left mt-2 md:mt-0">
                                    <span className="text-white font-bold text-lg leading-tight">{item.name}</span>
                                    <span className="text-slate-400 font-medium">LKR {item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex flex-row justify-center items-center px-6 py-4 md:py-0">
                                    <button 
                                        className="flex justify-center items-center w-8 h-8 rounded-lg bg-slate-800 text-white cursor-pointer hover:bg-slate-700 border border-slate-700 transition-colors"
                                        onClick={() => {
                                            addToCart(item, -1);
                                            setCart(getCart());
                                        }}
                                    >
                                        -
                                    </button>
                                    <span className="mx-4 font-bold text-white w-5 text-center">{item.quantity}</span>
                                    <button 
                                        className="flex justify-center items-center w-8 h-8 rounded-lg bg-blue-600 text-white cursor-pointer hover:bg-blue-500 transition-colors"
                                        onClick={() => {
                                            addToCart(item, 1);
                                            setCart(getCart());
                                        }}
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Subtotal and Delete */}
                                <div className="flex flex-row md:flex-col items-center justify-between md:justify-center px-6 w-full md:w-40 border-t md:border-t-0 md:border-l border-slate-800 h-full py-4 md:py-0">
                                    <span className="font-bold text-blue-400">
                                        LKR {(item.quantity * item.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </span>
                                    <button 
                                        className="mt-0 md:mt-2 text-slate-500 hover:text-red-500 transition-colors p-2"
                                        onClick={() => {
                                            addToCart(item, -item.quantity);
                                            setCart(getCart());
                                        }}
                                    >
                                        <TbTrash size={22} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary Section */}
                    <div className="w-full max-w-4xl mt-10 p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col md:flex-row items-center justify-between shadow-2xl">
                        <div className="mb-4 md:mb-0">
                            <span className="text-slate-400 text-sm uppercase tracking-wider font-semibold">Grand Total</span>
                            <div className="text-3xl font-bold text-white">
                                LKR {getTotal().toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </div>
                        </div>
                        <button 
                            className="w-full md:w-52 h-14 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 hover:bg-blue-500 active:scale-95 transition-all"
                            onClick={() => {
                                navigate("/checkout", { state: { items: cart } });
                            }}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center mt-20">
                    <p className="text-slate-500 text-xl mb-6">Your cart is empty</p>
                    <button 
                        onClick={() => navigate("/products")}
                        className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-500 transition-all"
                    >
                        Browse Products
                    </button>
                </div>
            )}
        </div>
    )
}