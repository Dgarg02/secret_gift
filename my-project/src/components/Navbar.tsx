"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart, Sparkles, ArrowRight } from "lucide-react";

export default function Navbar({ onGetStarted }: { onGetStarted: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "How it Works", href: "#how-it-works" },
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${
          isScrolled ? "py-4" : "py-6"
        }`}
      >
        {/* The "Floating Island" Container */}
        <div
          className={`relative w-[90%] max-w-6xl flex items-center justify-between px-6 py-3 transition-all duration-300 rounded-full ${
            isScrolled
              ? "bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50"
              : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="bg-gradient-to-tr from-pink-500 to-purple-600 p-1.5 rounded-lg text-white group-hover:rotate-12 transition-transform duration-300">
              <Heart size={20} fill="currentColor" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              MakeThemSmile
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-pink-600 transition-colors relative group"
              >
                {link.name}
                {/* Hover Underline Animation */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Log in
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="group bg-gray-900 text-white pl-5 pr-4 py-2.5 rounded-full text-sm font-semibold shadow-lg hover:shadow-pink-500/25 transition-all flex items-center gap-2"
            >
              Get Started
              <div className="bg-white/20 rounded-full p-1 group-hover:translate-x-1 transition-transform">
                <ArrowRight size={14} />
              </div>
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden text-gray-700 p-2 bg-white/50 rounded-full hover:bg-white transition"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-24 z-40 bg-white/90 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl p-6 md:hidden flex flex-col space-y-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="text-lg font-medium text-gray-800 py-2 border-b border-gray-100"
              >
                {link.name}
              </a>
            ))}
            <div className="flex flex-col gap-3 mt-4">
               <button className="w-full py-3 rounded-xl border border-gray-200 font-semibold text-gray-700">
                Log in
              </button>
              <button
                onClick={() => {
                  setIsMobileOpen(false);
                  onGetStarted();
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold shadow-md"
              >
                Get Started ✨
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}