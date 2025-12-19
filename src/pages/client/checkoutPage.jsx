import { useState, useEffect } from "react";
import { TbTrash, TbArrowLeft } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { addToCart, getCart } from "../../utils/cart.js";
import axios from "axios";

import { FaShippingFast } from "react-icons/fa";
import { GoListOrdered } from "react-icons/go";

export default function CheckoutPage() {
    const location = useLocation();
    const navigate = useNavigate();

    // Form State
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    
    // UI State
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useState(location.state?.items || getCart());

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login to checkout");
            navigate("/login");
            return;
        }
        
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/", {
            headers: { Authorization: `Bearer ${token}` },
        }).then((res) => {
            if(res.data.firstName) setName(res.data.firstName + " " + res.data.lastName);
        }).catch((err) => {
            console.error("User fetch error", err);
        });
    }, [navigate]);

    useEffect(() => {
        if (cart.length === 0) {
            toast.error("Your cart is empty");
            navigate("/products");
        }
    }, [cart, navigate]);

    const refreshCart = () => {
        setCart(getCart());
    };

    function getTotal() {
        return cart.reduce((total, item) => total + (item.quantity * item.price), 0);
    }

    async function handlePlaceOrder(e) {
        e.preventDefault();

        if (!name || !address || !phone) {
            toast.error("Please fill in all shipping details");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Session expired, please login again");
            navigate("/login");
            return;
        }

        setLoading(true);

        const order = {
            name: name,
            address: address,
            phone: phone,
            items: cart.map(item => ({
                productId: item.productId,
                qty: item.quantity
            }))
        };

        try {
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders", order, {
                headers: { Authorization: `Bearer ${token}` },
            });
            
            localStorage.removeItem("cart");
            toast.success("Order placed successfully!");
            navigate("/");
        } catch (error) {
            console.error(error);
            toast.error("Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full min-h-screen bg-slate-950 flex justify-center py-10 px-4 text-slate-200">
            <div className="w-full max-w-[1200px] flex flex-col md:flex-row gap-8">
                
                {/* Shipping Form */}
                <div className="w-full md:w-1/2 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8 h-fit">
                    <h2 className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
                        <span className="bg-blue-600/20 text-blue-500 w-8 h-8 rounded-full flex items-center justify-center text-sm"><FaShippingFast/></span> 
                        Shipping Details
                    </h2>
                    
                    <form className="flex flex-col gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">Full Name</label>
                            <input 
                                type="text" 
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-600"
                                placeholder="e.g. John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">Delivery Address</label>
                            <textarea 
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all h-[120px] resize-none placeholder-slate-600"
                                placeholder="e.g. 123 Main Street, Colombo"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">Phone Number</label>
                            <input 
                                type="tel" 
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-600"
                                placeholder="e.g. 077 123 4567"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </form>
                </div>

                {/*  Order Summary */}
                <div className="w-full md:w-1/2 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8 flex flex-col justify-between h-fit">
                    <div>
                        <h2 className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
                            <span className="bg-blue-600/20 text-blue-500 w-8 h-8 rounded-full flex items-center justify-center text-sm"><GoListOrdered/></span> 
                            Order Summary
                        </h2>

                        <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2 mb-8 scrollbar-thin scrollbar-thumb-slate-700">
                            {cart.map((item) => (
                                <div key={item.productId} className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-2xl border border-slate-800/50 group">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover border border-slate-700" />
                                    
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-slate-100 truncate">{item.name}</h3>
                                        <p className="text-slate-500 text-sm mt-1">
                                            LKR {item.price.toLocaleString()} x {item.quantity}
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-end gap-2">
                                        <span className="font-bold text-slate-200">
                                            LKR {(item.price * item.quantity).toLocaleString()}
                                        </span>
                                        
                                        <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1">
                                            <button 
                                                className="text-slate-400 hover:text-blue-500 font-bold px-1 transition-colors"
                                                onClick={() => { addToCart(item, -1); refreshCart(); }}
                                            >-</button>
                                            <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                                            <button 
                                                className="text-slate-400 hover:text-blue-500 font-bold px-1 transition-colors"
                                                onClick={() => { addToCart(item, 1); refreshCart(); }}
                                            >+</button>
                                        </div>
                                    </div>
                                    
                                    <button 
                                        className="text-slate-600 hover:text-red-500 p-1 transition-colors ml-2"
                                        onClick={() => { addToCart(item, -item.quantity); refreshCart(); }}
                                    >
                                        <TbTrash size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-slate-800 pt-6">
                        <div className="flex justify-between items-center mb-8">
                            <span className="text-xl font-bold text-slate-400">Total Amount</span>
                            <span className="text-3xl font-bold text-blue-500">
                                LKR {getTotal().toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </span>
                        </div>

                        <button 
                            onClick={handlePlaceOrder}
                            disabled={loading}
                            className={`w-full py-4 rounded-2xl text-white font-bold text-lg shadow-lg transition-all active:scale-[0.98]
                                ${loading 
                                    ? "bg-slate-700 cursor-not-allowed text-slate-400" 
                                    : "bg-blue-600 hover:bg-blue-500 shadow-blue-900/20"
                                }`
                            }
                        >
                            {loading ? "Processing Order..." : "Confirm & Place Order"}
                        </button>
                        
                        <button 
                            onClick={() => navigate("/products")}
                            className="w-full mt-4 text-slate-500 text-sm hover:text-blue-400 transition-colors flex items-center justify-center gap-2"
                        >
                            <TbArrowLeft size={16} /> Continue Shopping
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}