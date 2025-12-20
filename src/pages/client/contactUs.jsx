import React from "react";
import { BiPhone, BiEnvelope, BiMap, BiTimeFive } from "react-icons/bi";

export default function ContactUs() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for sending message goes here
    alert("Message sent! We will get back to you soon.");
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-200 px-6 py-20">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get in <span className="text-blue-500">Touch</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Have questions about a product or an order? Our team is here to help you. 
            Send us a message and we'll respond within 24 hours.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Side*/}
          <div className="flex-1 bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">Your Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="John Doe"
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="john@example.com"
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 ml-1">Subject</label>
                <input 
                  type="text" 
                  placeholder="Order Inquiry"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 ml-1">Message</label>
                <textarea 
                  rows="5"
                  required
                  placeholder="How can we help you?"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 transition-all resize-none"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98]"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right Side*/}
          <div className="lg:w-[400px] space-y-8">
            
            {/* Contact Cards */}
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-blue-600/10 p-3 rounded-lg text-blue-500">
                  <BiPhone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white">Phone Support</h4>
                  <p className="text-slate-400 text-sm mt-1">+94 11 234 5678</p>
                  <p className="text-slate-400 text-sm">+94 77 123 4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-600/10 p-3 rounded-lg text-blue-500">
                  <BiEnvelope size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white">Email Us</h4>
                  <p className="text-slate-400 text-sm mt-1">support@eshop.com</p>
                  <p className="text-slate-400 text-sm">sales@eshop.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-600/10 p-3 rounded-lg text-blue-500">
                  <BiMap size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white">Visit Store</h4>
                  <p className="text-slate-400 text-sm mt-1">
                    123 Tech Tower, Main Street,<br /> Colombo 07, Sri Lanka.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-600/10 p-3 rounded-lg text-blue-500">
                  <BiTimeFive size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white">Business Hours</h4>
                  <p className="text-slate-400 text-sm mt-1">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p className="text-slate-400 text-sm">Sat: 10:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>

            {/* Mini Map Placeholder */}
            <div className="w-full h-48 bg-slate-800 rounded-3xl overflow-hidden border border-slate-700 relative group">
                <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-transparent transition-colors duration-500"></div>
                <img 
                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1000&auto=format&fit=crop" 
                    className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700" 
                    alt="map location"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="bg-slate-900/80 px-4 py-2 rounded-lg text-xs font-bold border border-slate-700">View on Map</span>
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}