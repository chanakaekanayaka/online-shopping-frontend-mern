import { useState, useEffect } from "react";
import { TbTrash, TbArrowLeft } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { addToCart, getCart } from "../../utils/cart.js";
import axios from "axios";

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

    // 1. Check Auth on Load
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login to checkout");
            navigate("/login");
            return;
        }
        
        // Optional: Fetch user details to pre-fill form
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/", {
            headers: { Authorization: `Bearer ${token}` },
        }).then((res) => {
            // If your user object has these fields, pre-fill them:
            if(res.data.firstName) setName(res.data.firstName + " " + res.data.lastName);
            // if(res.data.address) setAddress(res.data.address); 
        }).catch((err) => {
            console.error("User fetch error", err);
        });
    }, [navigate]);

    // 2. Redirect if Cart is Empty
    useEffect(() => {
        if (cart.length === 0) {
            toast.error("Your cart is empty");
            navigate("/products"); // or wherever your shop page is
        }
    }, [cart, navigate]);

    // Helper: Refresh cart state
    const refreshCart = () => {
        setCart(getCart());
    };

    function getTotal() {
        return cart.reduce((total, item) => total + (item.quantity * item.price), 0);
    }

    async function handlePlaceOrder(e) {
        e.preventDefault(); // Prevent form reload

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

        setLoading(true); // Start loading

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
            
            // Success: Clear cart and redirect
            localStorage.removeItem("cart"); // Optional: clear local cart
            toast.success("Order placed successfully!");
            navigate("/"); // Redirect to an orders page or home
        } catch (error) {
            console.error(error);
            toast.error("Failed to place order. Please try again.");
        } finally {
            setLoading(false); // Stop loading
        }
    }

    return (
        <div className="w-full min-h-screen bg-gray-100 flex justify-center py-10 px-4">
            <div className="w-full max-w-[1200px] flex flex-col md:flex-row gap-6">
                
                {/* LEFT COLUMN: Shipping Form */}
                <div className="w-full md:w-1/2 bg-white rounded-xl shadow-lg p-6 h-fit">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                        <span className="text-blue-600">1.</span> Shipping Details
                    </h2>
                    
                    <form className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input 
                                type="text" 
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500 transition"
                                placeholder="e.g. John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <textarea 
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500 transition h-[100px] resize-none"
                                placeholder="e.g. 123 Main Street, Colombo"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input 
                                type="tel" 
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500 transition"
                                placeholder="e.g. 077 123 4567"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </form>
                </div>

                {/* RIGHT COLUMN: Order Summary */}
                <div className="w-full md:w-1/2 bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between h-fit">
                    <div>
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                            <span className="text-blue-600">2.</span> Order Summary
                        </h2>

                        <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2 mb-6">
                            {cart.map((item) => (
                                <div key={item.productId} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
                                    
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-800 line-clamp-1">{item.name}</h3>
                                        <p className="text-gray-500 text-sm">
                                            ${item.price.toLocaleString()} x {item.quantity}
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-end gap-1">
                                        <span className="font-bold text-gray-800">
                                            ${(item.price * item.quantity).toLocaleString()}
                                        </span>
                                        
                                        <div className="flex items-center gap-2 bg-white border rounded-lg px-2 py-1 shadow-sm">
                                            <button 
                                                className="text-gray-600 hover:text-blue-600 font-bold px-1"
                                                onClick={() => { addToCart(item, -1); refreshCart(); }}
                                            >-</button>
                                            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                            <button 
                                                className="text-gray-600 hover:text-blue-600 font-bold px-1"
                                                onClick={() => { addToCart(item, 1); refreshCart(); }}
                                            >+</button>
                                        </div>
                                    </div>
                                    
                                    <button 
                                        className="text-red-400 hover:text-red-600 p-2"
                                        onClick={() => { addToCart(item, -item.quantity); refreshCart(); }}
                                    >
                                        <TbTrash size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-xl font-bold text-gray-800">Total Amount</span>
                            <span className="text-2xl font-bold text-blue-600">
                                ${getTotal().toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </span>
                        </div>

                        <button 
                            onClick={handlePlaceOrder}
                            disabled={loading}
                            className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition
                                ${loading 
                                    ? "bg-gray-400 cursor-not-allowed" 
                                    : "bg-blue-600 hover:bg-blue-700 hover:shadow-xl active:scale-[0.99]"
                                }`
                            }
                        >
                            {loading ? "Processing..." : "Confirm & Pay"}
                        </button>
                        
                        <button 
                            onClick={() => navigate("/products")}
                            className="w-full mt-3 text-gray-500 text-sm hover:text-gray-800 hover:underline"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}