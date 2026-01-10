"use client";

import React from 'react';
import Link from 'next/link'; // Import Link for navigation
import { Lock, PenLine, Sparkles, Heart, ArrowRight, Star } from 'lucide-react';

const Hero = () => {
  const testimonials = [
    { text: "My mother didn't stop smiling 🥹", delay: "0s" },
    { text: "She said YES!! 💍👰", delay: "0.2s" },
    { text: "My best friend cried happy tears", delay: "0.4s" }
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#FDFCFD] font-sans selection:bg-pink-100">
      
      {/* 1. Luxurious Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-pink-200/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-200/20 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-rose-100/40 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 pt-32 pb-12 lg:pt-0 lg:pb-0">
        
        <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-12 gap-12 items-center">
          
          {/* --- LEFT COLUMN: Editorial Hero (Cols 7) --- */}
          <div className="lg:col-span-7 space-y-10 text-center lg:text-left">
            
            {/* Brand Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-pink-100 shadow-sm mx-auto lg:mx-0">
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
              <span className="text-xs font-bold tracking-widest uppercase text-gray-500">MakeThemSmile</span>
            </div>

            {/* Headline */}
            <div className="space-y-4 lg:space-y-2">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl leading-[1.1] text-gray-900">
                <span className="font-serif italic block text-gray-800">Make Someone</span>
                <span className="font-extrabold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                  Smile Today.
                </span>
              </h1>
              <p className="text-lg text-gray-500 max-w-lg mx-auto lg:mx-0 leading-relaxed pt-2 font-light">
                Craft a digital masterpiece. A password-protected, magical surprise website wrapped in elegance.
              </p>
            </div>

            {/* CTA Section - UPDATED WITH LINK */}
            <div className="flex flex-col sm:flex-row items-center lg:items-center gap-6 justify-center lg:justify-start">
              <Link 
                href="/makepass"
                className="group relative px-10 py-5 bg-gray-900 text-white rounded-full shadow-2xl hover:shadow-pink-500/20 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden w-full sm:w-auto flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center justify-center gap-3 font-semibold text-lg tracking-wide">
                  <span>Create a Gift</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-pink-100 to-purple-100" />
                  ))}
                </div>
                <span>10k+ Smiles Created</span>
              </div>
            </div>

            {/* Floating Glass Pills */}
            <div className="flex flex-wrap gap-3 pt-4 justify-center lg:justify-start">
              {testimonials.map((t, i) => (
                <div 
                  key={i} 
                  className="bg-white/60 backdrop-blur-md border border-white/80 shadow-lg shadow-pink-500/5 px-5 py-3 rounded-2xl text-gray-700 text-sm font-medium animate-fade-in-up"
                  style={{ animationDelay: t.delay }}
                >
                  {t.text}
                </div>
              ))}
            </div>
          </div>


          {/* --- RIGHT COLUMN: The Glass Instruction Card (Cols 5) --- */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            {/* Decorative Glow */}
            <div className="absolute -inset-4 bg-gradient-to-b from-pink-200 to-indigo-200 rounded-[40px] blur-2xl opacity-40" />

            {/* Card */}
            <div className="relative bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 sm:p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]">
              
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-serif text-2xl text-gray-900 italic">How it works</h3>
                <div className="bg-white/50 p-2 rounded-full backdrop-blur-sm">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                </div>
              </div>

              <div className="space-y-8 relative">
                {/* Timeline Line */}
                <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-pink-300 via-purple-300 to-transparent opacity-30" />

                {/* Steps */}
                <div className="relative flex gap-5 group">
                  <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-white shadow-lg shadow-pink-100 flex items-center justify-center border border-pink-50">
                    <Lock className="w-4 h-4 text-pink-500" />
                  </div>
                  <div className="pt-1">
                    <h4 className="font-bold text-gray-800 text-lg">Set Password</h4>
                    <div className="mt-2 bg-white/60 border border-white rounded-xl p-3 shadow-sm">
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Secret Password</p>
                      <p className="text-sm font-mono text-gray-800 bg-gray-50/50 px-2 py-1 rounded inline-block">FirstKissDate</p>
                    </div>
                  </div>
                </div>

                <div className="relative flex gap-5 group">
                  <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-white shadow-lg shadow-purple-100 flex items-center justify-center border border-purple-50">
                    <PenLine className="w-4 h-4 text-purple-500" />
                  </div>
                  <div className="pt-1 w-full">
                    <h4 className="font-bold text-gray-800 text-lg">Write Message</h4>
                    <div className="mt-2 bg-white/60 border border-white rounded-xl p-3 shadow-sm">
                       <div className="h-2 w-3/4 bg-gray-200 rounded-full mb-2 opacity-50" />
                       <div className="h-2 w-1/2 bg-gray-200 rounded-full opacity-50" />
                    </div>
                  </div>
                </div>

                <div className="relative flex gap-5 group">
                  <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-gray-900 to-gray-700 shadow-lg shadow-gray-400 flex items-center justify-center border border-gray-600">
                    <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                  </div>
                  <div className="pt-1 w-full">
                    <h4 className="font-bold text-gray-800 text-lg">Experience</h4>
                    <div className="mt-2 bg-gradient-to-br from-white/80 to-white/40 border border-white rounded-xl p-3 shadow-md relative overflow-hidden">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-900 text-sm">Magic Reveal</span>
                        <span className="font-mono text-sm text-gray-600">₹499</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;