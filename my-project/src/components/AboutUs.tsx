"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Use Router for reliable navigation
import { motion } from "framer-motion";
import { 
  Heart, ShieldCheck, Infinity as InfinityIcon, 
  MapPin, Plane, Cake, Sparkles, Frown, ArrowRight 
} from "lucide-react";

export default function About() {
  const router = useRouter(); // Initialize Router

  // Function to handle navigation
  const handleNavigate = () => {
    router.push("/makepass");
  };

  // Config for the gentle floating animation
  const floatTransition = (duration: number, delay: number) => ({
    duration: duration,
    repeat: 9999,
    repeatType: "reverse" as const,
    ease: "easeInOut",
    delay: delay,
  });

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-[#FDFCFD] font-sans">
      
      {/* 1. Background Atmosphere (Low Z-Index) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-rose-100/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* --- LEFT: The Story --- */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 relative z-30" // Increased Z-Index to ensure clickability
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-pink-100 shadow-sm">
              <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-pink-900/60">Our Mission</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-serif text-gray-900 leading-tight">
              Perfect for every <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 italic pr-2">
                "I love you" moment.
              </span>
            </h2>

            <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-light">
              <p>
                We built this for more than just Valentine's Day. We built it for the moments that matter.
              </p>
              <p>
                Whether you are miles apart, celebrating a milestone, or just need to say "I'm sorry" in a way that truly shows you care—a magical digital experience speaks louder than a text message.
              </p>
            </div>

            {/* --- PRIMARY CTA BUTTON (Fixed) --- */}
            <div className="pt-2">
              <motion.button 
                onClick={handleNavigate}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative z-40 px-8 py-3.5 bg-gray-900 text-white rounded-full font-bold shadow-xl hover:shadow-2xl hover:shadow-pink-500/20 transition-all flex items-center gap-3 cursor-pointer"
              >
                Create Your Gift
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>


          {/* --- RIGHT: The Floating "Occasion" Cards --- */}
          <div className="relative h-[600px] w-full hidden lg:block perspective-1000 z-20">
            <div className="absolute inset-0 flex items-center justify-center">

              {/* 1. BIRTHDAY CARD */}
              <motion.div 
                animate={{ y: [-10, 10, -10], rotate: [0, -2, 0] }}
                transition={floatTransition(6, 0)}
                className="absolute top-10 left-0 w-48 bg-white/80 backdrop-blur-xl p-4 rounded-3xl shadow-lg border border-pink-100 z-20 group hover:scale-105 transition-transform"
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="bg-pink-100 p-2 rounded-full">
                    <Cake className="w-4 h-4 text-pink-500" />
                  </div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Birthday</span>
                </div>
                <p className="text-sm font-bold text-gray-800">"Happy 24th! 🎂"</p>
                <div className="mt-2 text-xs text-gray-500 bg-white/50 rounded-lg p-1.5 inline-block">
                  Open your gift 🎁
                </div>
              </motion.div>

              {/* 2. LONG DISTANCE */}
              <motion.div 
                animate={{ y: [10, -10, 10], x: [0, 5, 0] }}
                transition={floatTransition(7, 1)}
                className="absolute top-16 right-4 w-52 bg-white/80 backdrop-blur-xl p-4 rounded-3xl shadow-lg border border-blue-100 z-10 hover:scale-105 transition-transform"
              >
                 <div className="flex items-center gap-3 mb-2">
                    <div className="bg-blue-50 p-2 rounded-full">
                      <Plane className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-gray-700">Long Distance</span>
                      <span className="text-[10px] text-gray-400">3,400 miles away</span>
                    </div>
                 </div>
                 <div className="flex items-center justify-between mt-2 px-2 text-gray-300">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <div className="h-[1px] flex-1 bg-gray-300 mx-2 border-t border-dashed"></div>
                    <MapPin className="w-3 h-3 text-pink-500" />
                 </div>
              </motion.div>

              {/* 3. ANNIVERSARY (Center - Linked) */}
              <motion.div 
                animate={{ scale: [1, 1.02, 1] }}
                transition={floatTransition(5, 0.5)}
                className="relative z-40 bg-white p-6 rounded-[32px] shadow-2xl border border-purple-50 w-60 rotate-[-2deg] hover:rotate-0 transition-transform duration-300"
              >
                <div className="w-full h-32 bg-gradient-to-br from-purple-100 to-pink-50 rounded-2xl mb-4 flex items-center justify-center relative overflow-hidden">
                   <Heart className="w-12 h-12 text-pink-400 fill-pink-100" />
                   <Sparkles className="absolute top-4 right-4 w-5 h-5 text-yellow-400 animate-pulse" />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-gray-900 text-lg">3 Years Today</h3>
                  <p className="text-xs text-gray-500 mt-1">Unlock your gallery</p>
                  
                  {/* --- SECONDARY CTA BUTTON (Fixed) --- */}
                  <button 
                    onClick={handleNavigate}
                    className="mt-3 w-full py-2 bg-gray-900 text-white text-xs font-bold rounded-full hover:bg-gray-800 transition-colors cursor-pointer relative z-50"
                  >
                    Enter Password
                  </button>

                </div>
              </motion.div>

              {/* 4. APOLOGY */}
              <motion.div 
                animate={{ y: [-15, 5, -15] }}
                transition={floatTransition(8, 2)}
                className="absolute bottom-16 left-6 w-44 bg-white/90 backdrop-blur-xl p-4 rounded-3xl shadow-lg border border-gray-100 z-20 hover:scale-105 transition-transform"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-yellow-50 p-1.5 rounded-full">
                    <Frown className="w-4 h-4 text-yellow-500" />
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Apology</span>
                </div>
                <p className="text-sm font-medium text-gray-700 italic">"I'm so sorry. Please forgive me? 🥺"</p>
              </motion.div>

              {/* 5. JUST BECAUSE */}
              <motion.div 
                animate={{ x: [-5, 5, -5], y: [5, -5, 5] }}
                transition={floatTransition(9, 1.5)}
                className="absolute bottom-24 right-10 bg-white/80 backdrop-blur-md p-4 rounded-3xl shadow-md border border-white z-20 hover:scale-105 transition-transform"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-50 p-2 rounded-full">
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-800">Just Because</h4>
                    <p className="text-[10px] text-gray-400">Make them smile today</p>
                  </div>
                </div>
              </motion.div>

              {/* Decorative Orbits (Background) */}
              <div className="absolute w-[500px] h-[500px] border border-gray-100 rounded-full z-[-1]" />
              <div className="absolute w-[350px] h-[350px] border border-gray-100 rounded-full z-[-1]" />
            </div>
          </div>
        </div>

        {/* --- BOTTOM ROW: Core Values --- */}
        <div className="grid md:grid-cols-3 gap-8 mt-24 relative z-30">
          {[
            { 
              icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />, 
              title: "Privacy First", 
              desc: "Encrypted memories. Only they can see it.",
              hoverColor: "group-hover:text-emerald-600",
              shadowColor: "hover:shadow-emerald-100/50"
            },
            { 
              icon: <InfinityIcon className="w-6 h-6 text-blue-500" />, 
              title: "Forever Yours", 
              desc: "A digital gift that lasts a lifetime.",
              hoverColor: "group-hover:text-blue-600",
              shadowColor: "hover:shadow-blue-100/50"
            },
            { 
              icon: <Heart className="w-6 h-6 text-rose-500" />, 
              title: "Pure Emotion", 
              desc: "Designed to trigger happy tears.",
              hoverColor: "group-hover:text-rose-600",
              shadowColor: "hover:shadow-rose-100/50"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover="hover"
              className={`group bg-white/40 backdrop-blur-sm border border-white/60 p-6 rounded-2xl shadow-sm transition-all duration-300 cursor-default ${item.shadowColor} hover:shadow-xl hover:bg-white`}
            >
              <motion.div 
                variants={{ hover: { scale: 1.1, rotate: 5, y: -2 } }}
                className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 transition-shadow group-hover:shadow-md"
              >
                {item.icon}
              </motion.div>
              <h3 className={`text-lg font-bold text-gray-900 mb-2 transition-colors duration-300 ${item.hoverColor}`}>
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}