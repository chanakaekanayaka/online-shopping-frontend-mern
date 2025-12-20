import React from 'react'
import { Link } from 'react-router-dom'
import { BiLogoFacebook, BiLogoInstagram, BiLogoTwitter, BiLogoYoutube } from "react-icons/bi";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 pt-16 pb-8 px-6 md:px-12 font-sans">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        
        {/* Column 1: Brand & About */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="text-2xl font-bold text-white tracking-tighter">
            E-<span className="text-blue-500">SHOP</span>
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed max-w-[280px]">
            Your one-stop destination for premium electronics and lifestyle products. Quality guaranteed since 2024.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-blue-500 hover:border-blue-500/50 transition-all"><BiLogoFacebook size={20}/></a>
            <a href="#" className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-blue-500 hover:border-blue-500/50 transition-all"><BiLogoInstagram size={20}/></a>
            <a href="#" className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-blue-500 hover:border-blue-500/50 transition-all"><BiLogoTwitter size={20}/></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
          <ul className="flex flex-col gap-3">
            <li><Link to="/" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">Home</Link></li>
            <li><Link to="/products" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">All Products</Link></li>
            <li><Link to="/reviews" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">Customer Reviews</Link></li>
            <li><Link to="/aboutus" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">Our Story</Link></li>
          </ul>
        </div>

        {/* Column 3: Support */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6">Support</h3>
          <ul className="flex flex-col gap-3">
            <li><Link to="/contactus" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">Contact Us</Link></li>
            <li><a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">Shipping Policy</a></li>
            <li><a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">Returns & Refunds</a></li>
            <li><a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">Terms of Service</a></li>
          </ul>
        </div>

        {/* Column 4: Newsletter/Smart Section */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6">Stay Updated</h3>
          <p className="text-slate-400 text-sm mb-4">Subscribe to get special offers and first look at new arrivals.</p>
          <div className="flex flex-col gap-2">
            <input 
              type="email" 
              placeholder="Email address" 
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 text-sm outline-none focus:border-blue-500 transition-all"
            />
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl transition-all active:scale-[0.98]">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="max-w-[1400px] mx-auto border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-500 text-xs text-center md:text-left">
          © 2025 E-SHOP E-commerce. All rights reserved. Designed for a premium experience.
        </p>
        <div className="flex items-center gap-6 opacity-50 grayscale hover:grayscale-0 transition-all">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
        </div>
      </div>
    </footer>
  )
}

export default Footer