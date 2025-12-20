import React from "react";
import { Link } from "react-router-dom";
import { 
  BiDumbbell,       // Strength & Equipment
  BiShieldAlt,      // Protection & Durability
  BiSupport,        // Expert Coaching/Support
  BiTrophy,         // Performance & Winning
  BiChevronRight 
} from "react-icons/bi";

export default function HomePage() {
  return (
    <div className="w-full bg-slate-950 text-white font-sans overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center px-6 py-12 md:py-20">
        {/* Background Decorative Blurs - Using your Blue branding */}
        <div className="absolute top-[-10%] left-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-900/15 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-[1200px] w-full flex flex-col lg:flex-row items-center gap-16">
          {/* Left Text Content */}
          <div className="flex-1 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 bg-slate-900/50 border border-slate-800 px-4 py-2 rounded-full mb-6 text-sm text-blue-400 font-medium">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
              New Season Equipment 2025
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight mb-6 uppercase">
              Master Your <br />
              <span className="text-blue-500 italic">Performance.</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-[550px] mx-auto lg:mx-0 leading-relaxed">
              Professional-grade sports tools for the elite athlete. Elevate your training with gear designed for durability, precision, and peak results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start ">
              <Link 
                to="/products" 
                className=" animate-pulse px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-900/30 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Explore Tools <BiChevronRight size={20}/>
              </Link>
              <Link 
                to="/aboutUs" 
                className="px-8 py-4 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-bold rounded-2xl transition-all text-center"
              >
                Our Mission
              </Link>
            </div>
          </div>

          {/* Right Hero Image Area */}
          <div className="flex-1 relative w-full max-w-[500px]">
            <div className="relative z-10 w-full aspect-square bg-gradient-to-br from-slate-800 to-slate-900 rounded-[40px] border border-slate-700 overflow-hidden shadow-2xl flex items-center justify-center group">
              <img 
                src="homeicon.jpg" 
                alt="Elite Sports Training" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
            </div>
            {/* Floating Trust Badge */}
            <div className="absolute -bottom-6 -left-6 bg-slate-900 border border-slate-700 p-4 rounded-2xl shadow-2xl z-20 hidden md:block animate-bounce">
              <p className="text-blue-500 font-bold text-xl">PRO GEAR</p>
              <p className="text-slate-400 text-xs uppercase tracking-widest">Athlete Approved</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full py-20 px-6 border-t border-slate-900 bg-slate-900/10">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="flex flex-col items-center text-center p-6 bg-slate-900/30 rounded-3xl border border-slate-800/50 group hover:border-blue-500/50 transition-colors">
            <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-4 text-blue-500 text-3xl group-hover:bg-blue-600 group-hover:text-white transition-all">
              <BiDumbbell />
            </div>
            <h4 className="font-bold text-lg mb-2">Elite Quality</h4>
            <p className="text-slate-500 text-sm">Industrial grade materials for extreme training.</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-slate-900/30 rounded-3xl border border-slate-800/50 group hover:border-blue-500/50 transition-colors">
            <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-4 text-blue-500 text-3xl group-hover:bg-blue-600 group-hover:text-white transition-all">
              <BiShieldAlt />
            </div>
            <h4 className="font-bold text-lg mb-2">Impact Ready</h4>
            <p className="text-slate-500 text-sm">Built to withstand the toughest conditions.</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-slate-900/30 rounded-3xl border border-slate-800/50 group hover:border-blue-500/50 transition-colors">
            <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-4 text-blue-500 text-3xl group-hover:bg-blue-600 group-hover:text-white transition-all">
              <BiSupport />
            </div>
            <h4 className="font-bold text-lg mb-2">Expert Advice</h4>
            <p className="text-slate-500 text-sm">Our trainers help you pick the right tools.</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-slate-900/30 rounded-3xl border border-slate-800/50 group hover:border-blue-500/50 transition-colors">
            <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-4 text-blue-500 text-3xl group-hover:bg-blue-600 group-hover:text-white transition-all">
              <BiTrophy />
            </div>
            <h4 className="font-bold text-lg mb-2">Proven Results</h4>
            <p className="text-slate-500 text-sm">Used by champions to reach the podium.</p>
          </div>

        </div>
      </section>
    </div>
  );
}