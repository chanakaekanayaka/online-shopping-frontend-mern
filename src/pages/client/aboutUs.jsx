import React from "react";
import { BiDumbbell, BiTargetLock, BiGroup, BiMedal } from "react-icons/bi";

export default function AboutUs() {
  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-200 px-6 py-20 font-sans">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight uppercase">
              Building <span className="text-blue-500 italic">Champions.</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Founded in 2025, our mission is to provide every athlete—from weekend warriors to professional competitors—with the high-performance tools they need to break limits. We don't just sell equipment; we provide the edge you need to win.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-900">
              <div>
                <h3 className="text-3xl font-bold text-white">5k+</h3>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Athletes Served</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">100%</h3>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Pro Grade Quality</p>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full max-w-[500px]">
            <div className="relative rounded-[40px] overflow-hidden border border-slate-800 shadow-2xl group">
              <img 
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop" 
                alt="Gym Training" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100 opacity-80"
              />
              <div className="absolute inset-0 bg-blue-600/10 mix-blend-multiply"></div>
            </div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="p-10 bg-slate-900/50 border border-slate-800 rounded-3xl hover:border-blue-500/50 transition-all group">
            <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-6 text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <BiDumbbell size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase italic">Our Mission</h2>
            <p className="text-slate-400 leading-relaxed">
              To engineer the most durable and precise sports tools on the market, ensuring that gear failure is never the reason a goal isn't reached.
            </p>
          </div>

          <div className="p-10 bg-slate-900/50 border border-slate-800 rounded-3xl hover:border-blue-500/50 transition-all group">
            <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-6 text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <BiTargetLock size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase italic">Our Vision</h2>
            <p className="text-slate-400 leading-relaxed">
              To be the global benchmark for athletic excellence, powering the next generation of world records through innovation and grit.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white uppercase tracking-tighter">The <span className="text-blue-500">Athlete</span> Code</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
          <div className="flex flex-col items-center">
            <BiMedal className="text-blue-500 text-5xl mb-4" />
            <h4 className="font-bold text-white mb-2 uppercase">Unmatched Quality</h4>
            <p className="text-slate-500 text-sm">Every tool is tested under extreme stress to ensure it survives the toughest workouts.</p>
          </div>
          <div className="flex flex-col items-center">
            <BiGroup className="text-blue-500 text-5xl mb-4" />
            <h4 className="font-bold text-white mb-2 uppercase">Community Driven</h4>
            <p className="text-slate-500 text-sm">We listen to athletes and coaches to constantly evolve our product designs.</p>
          </div>
          <div className="flex flex-col items-center">
            <BiDumbbell className="text-blue-500 text-5xl mb-4" />
            <h4 className="font-bold text-white mb-2 uppercase">Grit & Passion</h4>
            <p className="text-slate-500 text-sm">We are built by sports enthusiasts for sports enthusiasts. We live the game.</p>
          </div>
        </div>

      </div>
    </div>
  );
}