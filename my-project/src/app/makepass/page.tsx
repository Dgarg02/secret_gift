"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowLeft, Gift, Key, Type, Sparkles,
  Lock, Unlock, Heart, Crown, PartyPopper, Check
} from "lucide-react";

export default function MakePass() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    password: "",
    hint: "",
    message: "",
    // ✅ CHANGED: Default to basic_reveal since magic is disabled
    plan: "basic_reveal" as "basic_reveal" | "magic_experience",
  });

  // Watch password to toggle "Unlock" visual
  useEffect(() => {
    setIsUnlocked(formData.password.length > 0);
  }, [formData.password]);

  /* ---------------- VALIDATION ---------------- */
  const isStepValid = () => {
    switch (step) {
      case 1: return formData.title.trim().length > 0;
      case 2: return formData.password.trim().length > 0;
      case 3: return formData.message.trim().length > 0;
      default: return true;
    }
  };

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (!isStepValid()) return;
    setDirection(1);
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleCreate = () => {
    const token = localStorage.getItem("token");
    localStorage.setItem(
      "pending_gift",
      JSON.stringify({
        gifterName: "Anonymous",
        message: formData.message,
        password: formData.password,
        plan: formData.plan,
        title: formData.title,
        hint: formData.hint,
      })
    );
    router.push(token ? "/create-gift" : "/auth");
  };

  /* ---------------- ANIMATIONS ---------------- */
  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0, scale: 0.98, filter: "blur(10px)" }),
    center: { x: 0, opacity: 1, scale: 1, filter: "blur(0px)" },
    exit: (direction: number) => ({ x: direction < 0 ? 50 : -50, opacity: 0, scale: 0.98, filter: "blur(10px)" }),
  };

  const quickTitles = ["Happy Birthday", "Anniversary", "Just Because", "Miss You"];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F2F2F7] overflow-hidden relative font-sans">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-200/40 rounded-full blur-[120px]" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-200/40 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl w-full z-10 flex flex-col md:flex-row gap-8 items-center md:items-stretch h-auto md:h-[600px]">
        
        {/* ---------------- SIDEBAR / PROGRESS (Desktop) ---------------- */}
        <div className="hidden md:flex flex-col justify-between py-8 w-64 shrink-0">
           <div>
             <h1 className="text-2xl font-serif font-bold text-gray-900 mb-2">GiftForge</h1>
             <p className="text-sm text-gray-500">Create a digital memory.</p>
           </div>

           <div className="space-y-6">
              {['Occasion', 'Security', 'Message', 'Experience'].map((label, i) => {
                const isActive = step === i + 1;
                const isCompleted = step > i + 1;
                return (
                  <div key={i} className="flex items-center gap-4 transition-all duration-500">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-colors duration-300
                      ${isActive ? 'bg-black text-white border-black' : isCompleted ? 'bg-gray-200 text-gray-600 border-transparent' : 'bg-transparent text-gray-300 border-gray-200'}`}>
                      {isCompleted ? <Check size={14} /> : i + 1}
                    </div>
                    <span className={`text-sm font-medium transition-colors duration-300 ${isActive ? 'text-black' : 'text-gray-400'}`}>
                      {label}
                    </span>
                  </div>
                )
              })}
           </div>
           
           <div className="text-xs text-gray-400">Step {step} of 4</div>
        </div>

        {/* ---------------- MAIN CARD ---------------- */}
        <motion.div 
          layout
          className="flex-1 bg-white/70 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] border border-white/50 relative overflow-hidden flex flex-col"
        >
          {/* Mobile Progress Bar (Top) */}
          <div className="md:hidden h-1.5 bg-gray-100 w-full">
            <motion.div 
              className="h-full bg-black" 
              initial={{ width: 0 }} 
              animate={{ width: `${(step/4)*100}%` }}
            />
          </div>

          <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
            <AnimatePresence custom={direction} mode="wait">
              
              {/* STEP 1: TITLE */}
              {step === 1 && (
                <motion.div key="s1" variants={variants} custom={direction} initial="enter" animate="center" exit="exit" className="w-full">
                  <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-serif text-gray-900 mb-8 leading-tight">
                    What are we <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">celebrating?</span>
                  </motion.h2>
                  
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Type the title here..."
                    className="w-full bg-transparent text-2xl md:text-3xl placeholder:text-gray-300 border-b-2 border-gray-200 focus:border-black py-4 outline-none transition-all"
                    autoFocus
                  />

                  <div className="flex gap-3 mt-8 flex-wrap">
                    {quickTitles.map(t => (
                      <button key={t} onClick={() => setFormData({...formData, title: t})}
                        className="px-4 py-2 rounded-full bg-white border border-gray-200 hover:border-gray-400 hover:bg-gray-50 text-sm font-medium text-gray-600 transition-all shadow-sm">
                        {t}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: SECURITY */}
              {step === 2 && (
                <motion.div key="s2" variants={variants} custom={direction} initial="enter" animate="center" exit="exit" className="w-full">
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div 
                      animate={{ 
                        backgroundColor: isUnlocked ? "#10B981" : "#F3F4F6", 
                        color: isUnlocked ? "#FFF" : "#9CA3AF" 
                      }}
                      className="w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-500"
                    >
                      {isUnlocked ? <Unlock size={32} /> : <Lock size={32} />}
                    </motion.div>
                    <h2 className="text-4xl font-serif text-gray-900">Lock it up.</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="group relative">
                      <input
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        type="text" 
                        placeholder="Create a password..."
                        className="w-full bg-gray-50/50 hover:bg-gray-50 focus:bg-white rounded-xl px-6 py-6 text-xl outline-none border border-transparent focus:border-gray-200 focus:shadow-xl transition-all"
                        autoFocus
                      />
                      <Key className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                    </div>
                    
                    <input
                      name="hint"
                      value={formData.hint}
                      onChange={handleChange}
                      placeholder="Add a hint (optional)"
                      className="w-full bg-transparent px-6 py-3 text-gray-500 placeholder:text-gray-300 text-lg outline-none border-b border-gray-100 focus:border-gray-300 transition-all"
                    />
                  </div>
                </motion.div>
              )}

              {/* STEP 3: MESSAGE */}
              {step === 3 && (
                <motion.div key="s3" variants={variants} custom={direction} initial="enter" animate="center" exit="exit" className="w-full h-full">
                  <h2 className="text-4xl font-serif text-gray-900 mb-6">From the heart.</h2>
                  <div className="relative h-[300px] w-full">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your beautiful message here..."
                      className="w-full h-full bg-[#fffff0] text-gray-800 p-8 rounded-tr-[40px] rounded-bl-[40px] rounded-tl-lg rounded-br-lg shadow-sm border border-stone-100 text-lg leading-relaxed resize-none outline-none focus:shadow-md transition-all font-serif"
                      autoFocus
                    />
                    <div className="absolute top-4 right-4 opacity-20 rotate-12">
                      <Type size={60} />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: EXPERIENCE */}
              {step === 4 && (
                <motion.div key="s4" variants={variants} custom={direction} initial="enter" animate="center" exit="exit" className="w-full">
                  <h2 className="text-4xl font-serif text-gray-900 mb-8 text-center">Choose the vibe.</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* BASIC CARD (Always Active) */}
                    <div 
                      onClick={() => setFormData({...formData, plan: "basic_reveal"})}
                      className={`relative group cursor-pointer p-6 rounded-3xl border-2 transition-all duration-300 border-gray-900 bg-gray-50 shadow-lg`}
                    >
                      <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 text-gray-900">
                        <Gift size={24} />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Classic Reveal</h3>
                      <p className="text-sm text-gray-500 mb-4">Clean, simple, and minimal.</p>
                      <div className="absolute top-6 right-6"><CheckCircleIcon /></div>
                    </div>

                    {/* PREMIUM CARD (Disabled) */}
                    <div 
                      className="relative p-6 rounded-3xl border-2 border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed grayscale overflow-hidden"
                    >
                      {/* Disabled Overlay Badge */}
                      <div className="absolute top-4 right-4 bg-gray-200 text-gray-500 text-[10px] font-bold px-2 py-1 rounded-md z-20">
                        COMING SOON
                      </div>

                      <div className="relative z-10">
                         <div className="flex justify-between items-start mb-4">
                           <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-white">
                             <Sparkles size={24} />
                           </div>
                         </div>
                         <h3 className="text-xl font-bold mb-2 flex items-center gap-2">Magic Experience</h3>
                         <p className="text-sm text-gray-600 mb-4">Confetti, animations & cinematic reveals.</p>
                         <div className="flex gap-2 text-purple-600/50">
                            <PartyPopper size={16} />
                            <Crown size={16} />
                            <Heart size={16} />
                         </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* NAV FOOTER */}
          <div className="p-8 border-t border-gray-100/50 flex justify-between items-center bg-white/30">
             <button 
               onClick={prevStep} 
               disabled={step === 1}
               className={`flex items-center gap-2 text-sm font-medium transition-colors ${step === 1 ? 'opacity-0 cursor-default' : 'text-gray-500 hover:text-black'}`}
             >
               <ArrowLeft size={16} /> Back
             </button>

             <button 
               onClick={step === 4 ? handleCreate : nextStep}
               disabled={!isStepValid()}
               className={`
                 relative overflow-hidden px-8 py-3 rounded-2xl flex items-center gap-2 font-medium transition-all duration-300
                 ${!isStepValid() 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-black text-white hover:bg-gray-900 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'}
               `}
             >
               <span className="relative z-10">{step === 4 ? "Create Gift" : "Continue"}</span>
               {isStepValid() && <ArrowRight size={16} className="relative z-10" />}
             </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

const CheckCircleIcon = () => (
  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
    <Check size={14} className="text-white" />
  </div>
);