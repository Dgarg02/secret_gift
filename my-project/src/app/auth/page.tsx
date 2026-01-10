"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import Router
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, Lock, User, ArrowRight, Heart
} from "lucide-react";
import Link from "next/link";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false); 
  const [isLoading, setIsLoading] = useState(false);

  // Toggle between Login/Signup
  const toggleMode = () => setIsLogin(!isLogin);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call/Authentication
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to Upload Page
      router.push("/upload");
    }, 1500);
  };

  const handleGoogleLogin = () => {
    // Logic for Google Auth provider would go here
    router.push("/upload");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#FDFCFD] font-sans flex items-center justify-center p-6">
      
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-pink-100/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      {/* Floating Home Link */}
      <Link href="/" className="absolute top-8 left-8 z-20 flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
        <div className="bg-white/50 p-2 rounded-full border border-gray-100">
           <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
        </div>
        <span className="font-bold tracking-tight text-sm">MakeThemSmile</span>
      </Link>

      {/* MAIN AUTH CARD */}
      <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2.5rem] shadow-2xl overflow-hidden relative">
          
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 opacity-50" />

          <div className="p-8 md:p-10">
            
            {/* Header */}
            <div className="text-center mb-8">
              <motion.h1 
                key={isLogin ? "login" : "signup"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-serif text-gray-900 mb-2"
              >
                {isLogin ? "Welcome Back" : "Create Account"}
              </motion.h1>
              <p className="text-gray-500 text-sm">
                {isLogin 
                  ? "Enter your details to access your gifts." 
                  : "Sign up to save your magical surprise."}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name Field (Only for Signup) */}
              <AnimatePresence initial={false}>
                {!isLogin && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="group relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                      <input 
                        type="text" 
                        placeholder="Full Name"
                        required={!isLogin}
                        className="w-full bg-white/50 border border-gray-200 rounded-2xl py-3.5 pl-11 pr-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-200 transition-all"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email */}
              <div className="group relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-pink-500 transition-colors" />
                <input 
                  type="email" 
                  placeholder="Email Address"
                  required
                  className="w-full bg-white/50 border border-gray-200 rounded-2xl py-3.5 pl-11 pr-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-200 transition-all"
                />
              </div>

              {/* Password */}
              <div className="group relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                <input 
                  type="password" 
                  placeholder="Password"
                  required
                  className="w-full bg-white/50 border border-gray-200 rounded-2xl py-3.5 pl-11 pr-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-200 transition-all"
                />
              </div>

              {/* Forgot Password Link */}
              {isLogin && (
                <div className="flex justify-end">
                  <a href="#" className="text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors">
                    Forgot Password?
                  </a>
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                className="w-full py-4 rounded-xl bg-gray-900 text-white font-bold text-lg shadow-xl shadow-purple-200 hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group mt-2"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                
                {isLoading ? (
                  <span className="animate-pulse">Processing...</span>
                ) : (
                  <>
                    {isLogin ? "Sign In" : "Create Account"}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>

            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#fcfbfd] px-2 text-gray-400 font-bold tracking-wider">Or continue with</span>
              </div>
            </div>

            {/* Social Button - Google Only */}
            <div>
              <button 
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 py-3.5 border border-gray-200 rounded-2xl bg-white/50 hover:bg-white transition-all hover:shadow-md hover:border-gray-300 text-sm font-semibold text-gray-700"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Sign in with Google
              </button>
            </div>

            {/* Toggle Mode */}
            <div className="text-center mt-8">
              <p className="text-sm text-gray-500">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  onClick={toggleMode}
                  className="font-bold text-gray-900 hover:text-pink-600 transition-colors underline decoration-dotted underline-offset-4"
                >
                  {isLogin ? "Sign up for free" : "Log in"}
                </button>
              </p>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}