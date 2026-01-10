"use client";

import React from "react";
import { useRouter } from "next/navigation"; // 1. Import Router
import { motion } from "framer-motion";
import { Sparkles, Eye, CheckCircle2, Star } from "lucide-react";

export default function OurExperience() {
  const router = useRouter(); // 2. Initialize Router

  // 3. Navigation Handler
  const handleSelect = () => {
    router.push("/makepass");
  };

  const magicFeatures = [
    { icon: "🎁", title: "Treasure Box", desc: "Upload photos inside" },
    { icon: "🔮", title: "Crystal Ball", desc: "Mysterious reveal" },
    { icon: "🎡", title: "Spin Wheel", desc: "Fun decision maker" },
    { icon: "🎈", title: "Balloon Pop", desc: "Pop to reveal" },
    { icon: "🎉", title: "Confetti Blast", desc: "Celebration mode" },
  ];

  // Floating animation for background elements
  const floatAnim = {
    animate: {
      y: [0, -20, 0],
      x: [0, 10, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-[#FDFCFD] font-sans">
      
      {/* 1. Dynamic Floating Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          variants={floatAnim}
          animate="animate"
          className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-pink-200/30 rounded-full blur-[100px]" 
        />
        <motion.div 
          variants={floatAnim}
          animate="animate"
          transition={{ delay: 2 }} 
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-200/20 rounded-full blur-[120px]" 
        />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-purple-100 shadow-sm"
          >
            <Star className="w-3 h-3 text-purple-500 fill-purple-500" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-purple-900/60">Pricing & Features</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif text-gray-900"
          >
            Our Experience
          </motion.h2>
          <motion.p
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="text-gray-500 max-w-lg mx-auto"
          >
            Choose how you want to deliver your surprise. Make it simple or make it magical.
          </motion.p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* --- OPTION A: BASIC REVEAL --- */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ y: -10 }} 
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
            className="group relative bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-8 shadow-xl hover:shadow-2xl transition-all duration-300 mt-0 md:mt-8"
          >
            <div className="text-center mb-6">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Option A</span>
              <div className="mt-2 mb-1">
                <span className="text-4xl font-serif text-gray-900">₹99</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-700">Basic Reveal</h3>
              <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                A simple, elegant password-protected message page.
              </p>
            </div>

            <div className="space-y-4 mb-8 px-4 bg-white/30 rounded-2xl p-4">
               <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-pink-400" /> <span>Secret Password Protection</span>
               </div>
               <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-pink-400" /> <span>Custom Heartfelt Message</span>
               </div>
               <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-pink-400" /> <span>Mobile Responsive</span>
               </div>
            </div>

            <button 
              onClick={handleSelect} // Added Navigation
              className="w-full py-4 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2 group-hover:bg-white bg-white/50 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              Get Started
            </button>
          </motion.div>


          {/* --- OPTION B: MAGIC EXPERIENCE (PREMIUM) --- */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ y: -15, scale: 1.02 }} 
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
            className="relative z-10" // Ensured Z-Index
          >
            {/* Animated Glow Behind */}
            <div className="absolute -inset-[2px] bg-gradient-to-b from-pink-300 via-purple-400 to-indigo-300 rounded-[34px] blur-md opacity-60 animate-pulse" />
            
            <div className="relative bg-white/90 backdrop-blur-xl rounded-[32px] p-1 shadow-2xl overflow-hidden">
              
              {/* Shine Effect Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

              {/* Badge */}
              <div className="absolute top-0 right-0 z-20">
                <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[10px] font-bold px-5 py-2 rounded-bl-2xl rounded-tr-xl shadow-lg tracking-wider">
                  MOST POPULAR
                </div>
              </div>

              <div className="bg-gradient-to-b from-white to-purple-50/50 rounded-[30px] p-8 h-full">
                
                {/* Header */}
                <div className="text-center mb-8 pt-2">
                  <span className="text-xs font-bold text-purple-600 uppercase tracking-widest">Option B</span>
                  <div className="mt-2 mb-1">
                    <span className="text-5xl font-serif text-gray-900">₹499</span>
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    Magic Experience
                  </h3>
                  <p className="text-gray-600 text-xs mt-2 font-medium bg-purple-100/50 inline-block px-3 py-1 rounded-full">
                    Includes Treasure Box, Spin Wheel & Animations
                  </p>
                </div>

                {/* The Floating Icons Grid */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                  {magicFeatures.map((feat, i) => (
                    <motion.div 
                      key={i}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: "easeInOut", 
                        delay: i * 0.2 
                      }}
                      className={`flex flex-col items-center text-center p-3 bg-white rounded-2xl shadow-sm border border-purple-100 hover:shadow-md transition-shadow cursor-default ${
                        i >= 3 ? 'col-span-1.5' : '' 
                      }`}
                    >
                      <div className="text-2xl mb-2 filter drop-shadow-sm transform hover:scale-125 transition-transform duration-300">
                        {feat.icon}
                      </div>
                      <h4 className="text-[11px] font-bold text-gray-800 leading-tight">{feat.title}</h4>
                      <p className="text-[9px] text-gray-400 mt-0.5 leading-tight">{feat.desc}</p>
                    </motion.div>
                  ))}
                </div>

                {/* PRIMARY CTA BUTTON (Fixed) */}
                <motion.button 
                  onClick={handleSelect} // Added Navigation
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl bg-gray-900 text-white font-bold text-lg shadow-xl shadow-purple-200 hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden cursor-pointer"
                >
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  
                  <Sparkles className="w-5 h-5 text-yellow-300 fill-yellow-300 group-hover:rotate-12 transition-transform" />
                  Select Magic
                </motion.button>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}