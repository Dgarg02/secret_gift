"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, Heart, Sparkles, MapPin } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Ananya Sharma",
    event: "Roka Surprise",
    text: "I wanted to propose before our official Roka. I hid the 'Will You Marry Me?' inside the Treasure Box. She was shaking when she saw it! 💍✨",
    rating: 5,
    location: "Delhi",
    delay: 0,
  },
  {
    id: 2,
    name: "Rahul & Sneha",
    event: "Long Distance (Mum-Blr)",
    text: "Bangalore to Mumbai is tough. This website made us feel close for our 1st anniversary. It felt like a Bollywood movie scene in real life.",
    rating: 5,
    location: "Mumbai",
    delay: 0.1,
    highlight: true, // Special Royal Card
  },
  {
    id: 3,
    name: "Vikram Malhotra",
    event: "Wife's Birthday",
    text: "My wife is impossible to shop for. I made a 'Magic Experience' with photos from our honeymoon in Jaipur. She actually cried happy tears.",
    rating: 5,
    location: "Pune",
    delay: 0.2,
  },
  {
    id: 4,
    name: "Zara Khan",
    event: "Bestie's Birthday",
    text: "Sent this to my best friend at midnight. The confetti blast animation on her phone screen was the perfect start to her day! 🎉",
    rating: 5,
    location: "Hyderabad",
    delay: 0.3,
  },
  {
    id: 5,
    name: "Arjun Das",
    event: "Apology Gift",
    text: "I messed up our monthly date. This didn't fix it instantly, but the 'Crystal Ball' revealing my apology note definitely melted her anger.",
    rating: 4,
    location: "Chennai",
    delay: 0.4,
  },
  {
    id: 6,
    name: "Priya V.",
    event: "Rakhi Gift",
    text: "My brother is studying abroad. I sent him a digital Rakhi with a voice note inside. He called me immediately. Best digital gift ever.",
    rating: 5,
    location: "London/India",
    delay: 0.5,
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 px-6 overflow-hidden bg-[#FDFCFD] font-sans">
      
      {/* 1. Dynamic Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ y: [0, -20, 0], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/3 w-[800px] h-[800px] bg-rose-50/60 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ y: [0, 20, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-50/40 rounded-full blur-[100px]" 
        />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-rose-100 shadow-sm"
          >
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-rose-900/60">Dil Ki Baat (Heartfelt Stories)</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif text-gray-900"
          >
            Real stories, <br className="md:hidden" /> Desi emotions.
          </motion.h2>
        </div>

        {/* Masonry Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: review.delay }}
              
              // HOVER ANIMATIONS
              whileHover={{ 
                y: -10, 
                transition: { type: "spring", stiffness: 300 } 
              }}
              
              className={`group relative p-8 rounded-[2.5rem] border transition-all duration-500 cursor-default ${
                review.highlight 
                  ? "bg-gray-900 border-gray-800 shadow-2xl shadow-indigo-900/20" 
                  : "bg-white/70 backdrop-blur-xl border-white/60 shadow-lg hover:shadow-2xl hover:bg-white hover:border-pink-100/50"
              }`}
            >
              {/* Decorative Quote Icon - Moves on Hover */}
              <motion.div 
                className="absolute top-8 right-8"
                whileHover={{ rotate: 15, scale: 1.1 }}
              >
                <Quote 
                  className={`w-8 h-8 font-serif transition-colors duration-300 ${
                    review.highlight ? "text-gray-700 group-hover:text-gray-600" : "text-indigo-100 group-hover:text-indigo-200"
                  }`} 
                />
              </motion.div>

              {/* Star Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110 ${
                      i < review.rating 
                        ? "text-yellow-400 fill-yellow-400" 
                        : "text-gray-300"
                    }`} 
                    style={{ transitionDelay: `${i * 50}ms` }}
                  />
                ))}
              </div>

              {/* The Quote */}
              <p 
                className={`font-serif text-lg leading-relaxed mb-8 relative z-10 ${
                  review.highlight ? "text-gray-100" : "text-gray-700"
                }`}
              >
                "{review.text}"
              </p>

              {/* User Info Section */}
              <div className="flex items-center gap-3 pt-6 border-t border-dashed border-opacity-20 w-full"
                   style={{ borderColor: review.highlight ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' }}>
                
                {/* Avatar Gradient Placeholder */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ${
                  review.highlight 
                    ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white border border-white/10" 
                    : "bg-gradient-to-br from-pink-100 to-orange-50 text-rose-600 border border-white"
                }`}>
                  {review.name.charAt(0)}
                </div>
                
                <div className="flex-1">
                  <p className={`text-sm font-bold ${
                    review.highlight ? "text-white" : "text-gray-900"
                  }`}>
                    {review.name}
                  </p>
                  
                  {/* Location & Event Row */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-0.5">
                    <p className={`text-xs truncate ${
                      review.highlight ? "text-gray-400" : "text-purple-600 font-medium"
                    }`}>
                      {review.event}
                    </p>
                    <span className="text-[8px] opacity-30">•</span>
                    <div className="flex items-center gap-0.5 opacity-60">
                       <MapPin className={`w-2.5 h-2.5 ${review.highlight ? "text-gray-400" : "text-gray-500"}`} />
                       <span className={`text-[10px] ${review.highlight ? "text-gray-400" : "text-gray-500"}`}>{review.location}</span>
                    </div>
                  </div>
                </div>

                {/* Highlight Sparkle */}
                {review.highlight && (
                   <div className="bg-white/10 p-2 rounded-full animate-pulse">
                      <Sparkles className="w-4 h-4 text-yellow-300" />
                   </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}