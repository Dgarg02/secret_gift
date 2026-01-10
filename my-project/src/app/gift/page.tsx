"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Copy, Check, Share2, ExternalLink, 
  MessageCircle, Gift, ArrowRight 
} from "lucide-react";
import Confetti from "react-confetti";
import Link from "next/link";

export default function GiftReadyPage() {
  const [copied, setCopied] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Mock unique link
  const giftLink = "https://makethemsmile.com/view/love-x9z2";

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(giftLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`I made something special for you! 🎁 Open this when you are alone: ${giftLink}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#FDFCFD] font-sans flex items-center justify-center p-6">
      
      {/* 1. Celebration Confetti (Stops after 5s) */}
      <Confetti 
        width={windowSize.width} 
        height={windowSize.height} 
        recycle={false} 
        numberOfPieces={400} 
        gravity={0.15} 
      />

      {/* 2. Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-pink-100/40 to-transparent rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      <div className="max-w-xl w-full relative z-10">
        
        {/* --- MAIN CARD --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[3rem] shadow-2xl overflow-hidden relative"
        >
          {/* Top Gradient Border */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400" />

          <div className="p-8 md:p-12 text-center">
            
            {/* Animated Icon */}
            <div className="relative w-24 h-24 mx-auto mb-8">
               <div className="absolute inset-0 bg-pink-100 rounded-full animate-ping opacity-20" />
               <div className="relative bg-white rounded-full w-full h-full flex items-center justify-center shadow-lg border border-pink-50">
                 <Gift className="w-10 h-10 text-pink-500" />
               </div>
               <motion.div 
                 animate={{ rotate: [0, 10, -10, 0] }}
                 transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                 className="absolute -top-2 -right-2 text-2xl"
               >
                 ✨
               </motion.div>
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-serif text-gray-900 mb-4"
            >
              It's officially wrapped!
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-500 text-lg mb-10 leading-relaxed"
            >
              Your digital surprise is active and ready to be shared. 
              Only those with the link (and password) can see it.
            </motion.p>

            {/* --- LINK BOX --- */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-50/80 border border-gray-200 rounded-2xl p-2 flex items-center justify-between shadow-inner mb-8 group hover:border-purple-200 transition-colors"
            >
              <div className="px-4 overflow-hidden">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Your Unique Link</p>
                <p className="font-mono text-gray-800 truncate text-sm">{giftLink}</p>
              </div>
              
              <button 
                onClick={handleCopy}
                className={`p-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-sm ${
                  copied 
                    ? "bg-green-100 text-green-700" 
                    : "bg-white text-gray-700 hover:text-purple-600 hover:shadow-md"
                }`}
              >
                {copied ? (
                  <>Copied <Check className="w-4 h-4" /></>
                ) : (
                  <>Copy <Copy className="w-4 h-4" /></>
                )}
              </button>
            </motion.div>

            {/* --- ACTION BUTTONS --- */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-3"
            >
              {/* WhatsApp Share (Primary) */}
              <button 
                onClick={handleWhatsApp}
                className="w-full py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-lg shadow-lg shadow-green-200/50 hover:shadow-xl transition-all flex items-center justify-center gap-2 relative overflow-hidden group"
              >
                 <MessageCircle className="w-5 h-5 fill-white" />
                 Send via WhatsApp
              </button>

              {/* Grid of Secondary Actions */}
              <div className="grid grid-cols-2 gap-3">
                 <button className="py-3 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-sm transition-all flex items-center justify-center gap-2">
                   <Share2 className="w-4 h-4" /> More Options
                 </button>
                 
                 <Link href="/view/preview" className="block w-full">
                    <button className="w-full py-3 rounded-xl bg-white border border-gray-200 hover:border-purple-200 hover:text-purple-600 text-gray-700 font-bold text-sm transition-all flex items-center justify-center gap-2">
                      <ExternalLink className="w-4 h-4" /> Preview Gift
                    </button>
                 </Link>
              </div>
            </motion.div>

          </div>
          
          {/* Bottom Info Bar */}
          <div className="bg-gray-50 border-t border-gray-100 p-4 text-center">
            <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Hosted forever on makethemsmile.com
            </p>
          </div>

        </motion.div>

        {/* Dashboard Link */}
        <div className="text-center mt-8">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-800 transition-colors group">
            Go to My Dashboard <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
}