"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Instagram, Twitter, Facebook, Mail, ArrowUp, Send } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#FDFCFD] pt-24 pb-12 overflow-hidden font-sans border-t border-gray-100">
      
      {/* 1. Background Atmosphere (Subtle continuation) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute -top-24 left-1/4 w-[500px] h-[500px] bg-pink-50/50 rounded-full blur-[100px]" />
         <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- TOP SECTION: Final CTA --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-2">
              Ready to make them smile?
            </h2>
            <p className="text-gray-500">Create your magical surprise in less than 5 minutes.</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gray-900 text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:shadow-pink-500/20 transition-all flex items-center gap-2"
          >
            Create a Gift Now <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
          </motion.button>
        </div>

        <hr className="border-gray-100 mb-16" />

        {/* --- MIDDLE SECTION: Links & Brand --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand (Cols 4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="inline-flex items-center gap-2">
              <div className="bg-gradient-to-tr from-pink-500 to-purple-600 p-1.5 rounded-lg text-white">
                <Heart size={18} fill="currentColor" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">
                MakeThemSmile
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              The most beautiful way to send digital love. Encrypted, permanent, and designed to trigger happy tears.
            </p>
            
            {/* Newsletter Input */}
            <div className="relative max-w-xs">
              <input 
                type="email" 
                placeholder="Enter your email for updates" 
                className="w-full bg-white border border-gray-200 rounded-full py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all"
              />
              <button className="absolute right-1.5 top-1.5 p-1.5 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors">
                <Send size={14} />
              </button>
            </div>
          </div>

          {/* Column 2: Product */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="font-bold text-gray-900 mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              {['Pricing', 'Features', 'Our Story', 'Wall of Love'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-pink-600 transition-colors block hover:translate-x-1 duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Occasions */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-gray-900 mb-6">Occasions</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              {['Birthday', 'Anniversary', 'Long Distance', 'Apology', 'Just Because'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-purple-600 transition-colors block hover:translate-x-1 duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-gray-900 mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              {['Privacy Policy', 'Terms of Use', 'Refund Policy', 'Contact Us'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-gray-900 transition-colors block hover:translate-x-1 duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* --- BOTTOM SECTION: Copyright --- */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100 gap-4">
          
          <div className="text-sm text-gray-400 font-medium">
            © 2024 MakeThemSmile. Made with <span className="text-red-500 animate-pulse">❤️</span> in India.
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-400 hover:text-pink-600 transition-colors transform hover:scale-110">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors transform hover:scale-110">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors transform hover:scale-110">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors transform hover:scale-110">
              <Mail size={20} />
            </a>
          </div>

          <button 
            onClick={scrollToTop}
            className="md:hidden fixed bottom-6 right-6 bg-white p-3 rounded-full shadow-lg border border-gray-100 text-gray-600 z-50"
          >
            <ArrowUp size={20} />
          </button>
        </div>

      </div>
    </footer>
  );
}