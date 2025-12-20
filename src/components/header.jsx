import { useState } from "react";
import { BiCart, BiMenu, BiX, BiUserCircle } from "react-icons/bi"; // Added User icon
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="h-[80px] w-full bg-slate-950 border-b border-slate-800 sticky top-0 z-50 flex items-center justify-between px-6">
      
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-white tracking-tighter shrink-0">
        E-<span className="text-blue-600">SHOP</span>
      </Link>

      {/* Navigation */}
      <nav className={`
        ${isMenuOpen ? "flex" : "hidden"} 
        lg:flex flex-col lg:flex-row absolute lg:relative top-[80px] lg:top-0 left-0 w-full lg:w-auto 
        bg-slate-950 lg:bg-transparent p-6 lg:p-0 gap-6 lg:gap-8 border-b lg:border-none border-slate-800 transition-all duration-300
      `}>
        <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-slate-300 text-xl lg:text-lg hover:text-blue-500 font-medium">Home</Link>
        <Link to="/reviews" onClick={() => setIsMenuOpen(false)} className="text-slate-300 text-xl lg:text-lg hover:text-blue-500 font-medium">Reviews</Link>
        <Link to="/products" onClick={() => setIsMenuOpen(false)} className="text-slate-300 text-xl lg:text-lg hover:text-blue-500 font-medium">Product</Link>
        <Link to="/contactus" onClick={() => setIsMenuOpen(false)} className="text-slate-300 text-xl lg:text-lg hover:text-blue-500 font-medium">ContactUs</Link>
        <Link to="/aboutus" onClick={() => setIsMenuOpen(false)} className="text-slate-300 text-xl lg:text-lg hover:text-blue-500 font-medium">AboutUs</Link>
      </nav>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        
        {/*  LOGIN/LOGOUT LOGIC */}
        {token == null ? (
         
          <Link 
            to="/login" 
            className="hidden md:flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all active:scale-95"
          >
            <BiUserCircle size={20} />
            Login
          </Link>
        ) : (
          
          <button 
            onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}
            className="hidden md:block text-slate-400 hover:text-red-500 text-sm font-semibold transition-colors"
          >
            Logout
          </button>
        )}

        <Link to="/cart" className="relative p-2 bg-slate-900 border border-slate-800 rounded-full hover:bg-slate-800 transition-colors">
          <BiCart className="text-white text-2xl" />
          <span className="absolute top-0 right-0 h-3 w-3 bg-blue-600 border-2 border-slate-950 rounded-full"></span>
        </Link>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="lg:hidden text-slate-300 hover:text-white transition-colors"
        >
          {isMenuOpen ? <BiX size={32} /> : <BiMenu size={32} />}
        </button>
      </div>
    </header>
  );
}