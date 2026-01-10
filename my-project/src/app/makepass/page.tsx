"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // 1. Import Router
import { motion, AnimatePresence } from "framer-motion";
import { 
  Lock, Key, MessageCircle, Sparkles, Check, 
  ArrowRight, ArrowLeft, Star, Gift, CheckCircle2, Crown, Type 
} from "lucide-react";

export default function MakePass() {
  const router = useRouter(); // 2. Initialize Router
  
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  
  const [formData, setFormData] = useState({
    title: "",
    password: "",
    hint: "",
    message: "",
    plan: "magic"
  });

  // --- VALIDATION LOGIC ---
  const isStepValid = () => {
    switch(step) {
      case 1: return formData.title.trim().length > 0;
      case 2: return formData.password.trim().length > 0;
      case 3: return formData.message.trim().length > 0;
      default: return true;
    }
  };

  // --- HANDLERS ---
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

  // --- FINAL ACTION: GO TO AUTH ---
  const handleCreate = () => {
    // Save draft so data isn't lost during sign up
    if (typeof window !== 'undefined') {
      localStorage.setItem("giftDraft", JSON.stringify(formData));
    }
    // Redirect to Auth page
    router.push("/auth");
  };

  // --- CONFIG ---
  const quickTitles = ["Happy Birthday 🎂", "Happy Anniversary ❤️", "Open When You Miss Me 💌", "For My Bestie 👯‍♀️"];
  
  const magicFeatures = [
    { icon: "🎁", title: "Treasure Box", sub: "Hidden photos" },
    { icon: "🔮", title: "Crystal Ball", sub: "Future reveal" },
    { icon: "🎡", title: "Spin Wheel", sub: "Decision maker" },
    { icon: "🎈", title: "Balloon Pop", sub: "Interactive fun" },
    { icon: "🎉", title: "Confetti", sub: "Celebration" },
  ];

  const basicFeatures = [
    { title: "Secret Password", sub: "Standard encryption" },
    { title: "Simple Text", sub: "No formatting" },
    { title: "Standard Theme", sub: "Basic white background" },
  ];

  // Animation Variants
  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 50 : -50, opacity: 0 }),
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#FDFCFD] font-sans flex items-center justify-center p-6">
      
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-pink-100/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      <div className="max-w-3xl w-full relative z-10">
        
        {/* --- STEP PROGRESS --- */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-2">
          <div className="inline-flex bg-white/40 backdrop-blur-md rounded-full p-1.5 border border-white/60 shadow-sm min-w-max">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i}
                className={`px-4 sm:px-6 py-2 rounded-full text-xs font-bold transition-all duration-500 flex items-center gap-2 ${
                  step === i 
                    ? "bg-gray-900 text-white shadow-md" 
                    : step > i 
                      ? "text-gray-400 bg-gray-100/50" 
                      : "text-gray-400"
                }`}
              >
                {step > i ? <Check className="w-3 h-3" /> : <span>{i}</span>}
                <span className="hidden sm:inline">
                  {i === 1 ? "Occasion" : i === 2 ? "Security" : i === 3 ? "Message" : "Finish"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* --- MAIN CARD --- */}
        <motion.div 
          layout
          className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2.5rem] shadow-2xl p-6 md:p-10 relative overflow-hidden min-h-[500px] flex flex-col"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 opacity-50" />

          <div className="flex-grow">
            <AnimatePresence custom={direction} mode="wait">
              
              {/* STEP 1: TITLE */}
              {step === 1 && (
                <motion.div key="step1" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="space-y-8">
                  <div className="text-center space-y-2">
                    <div className="w-14 h-14 bg-rose-50 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-sm">
                      <Crown className="w-6 h-6 text-rose-500" />
                    </div>
                    <h2 className="text-3xl font-serif text-gray-900">What's the Occasion?</h2>
                    <p className="text-gray-500 text-sm">Give your surprise gift a title.</p>
                  </div>
                  <div className="max-w-md mx-auto space-y-6">
                    <div className="group">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Title of Gift</label>
                      <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Happy Anniversary My Love" autoFocus className="w-full bg-white/50 border border-gray-200 rounded-2xl py-4 pl-6 pr-4 font-medium text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-200 transition-all" />
                    </div>
                    <div>
                       <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Quick Ideas</p>
                       <div className="flex flex-wrap gap-2">
                         {quickTitles.map(t => (
                           <button key={t} onClick={() => setFormData({...formData, title: t})} className="bg-white/60 hover:bg-white border border-gray-100 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 transition-all hover:shadow-sm">{t}</button>
                         ))}
                       </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: PASSWORD */}
              {step === 2 && (
                <motion.div key="step2" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="space-y-8">
                  <div className="text-center space-y-2">
                    <div className="w-14 h-14 bg-pink-50 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-sm">
                      <Lock className="w-6 h-6 text-pink-500" />
                    </div>
                    <h2 className="text-3xl font-serif text-gray-900">Set Security</h2>
                    <p className="text-gray-500 text-sm">Create a secret key.</p>
                  </div>
                  <div className="space-y-5 max-w-md mx-auto">
                    <input type="text" name="password" value={formData.password} onChange={handleChange} placeholder="Secret Password" autoFocus className="w-full bg-white/50 border border-gray-200 rounded-2xl py-4 pl-6 pr-4 font-medium text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-200 transition-all" />
                    <input type="text" name="hint" value={formData.hint} onChange={handleChange} placeholder="Hint (Optional)" className="w-full bg-white/50 border border-gray-200 rounded-2xl py-4 pl-6 pr-4 font-medium text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-200 transition-all" />
                  </div>
                </motion.div>
              )}

              {/* STEP 3: MESSAGE */}
              {step === 3 && (
                <motion.div key="step3" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="space-y-8">
                  <div className="text-center space-y-2">
                     <div className="w-14 h-14 bg-purple-50 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-sm">
                      <MessageCircle className="w-6 h-6 text-purple-500" />
                    </div>
                    <h2 className="text-3xl font-serif text-gray-900">Write Message</h2>
                    <p className="text-gray-500 text-sm">Pour your heart out.</p>
                  </div>
                  <div className="relative group max-w-lg mx-auto">
                    <textarea name="message" value={formData.message} onChange={handleChange} autoFocus placeholder="My dearest..." className="w-full h-56 bg-white/50 border border-gray-200 rounded-3xl p-6 font-serif text-lg text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-200 transition-all resize-none leading-relaxed" />
                  </div>
                </motion.div>
              )}

              {/* STEP 4: EXPERIENCE */}
              {step === 4 && (
                <motion.div key="step4" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="space-y-6">
                  <div className="text-center space-y-2 mb-6">
                     <div className="w-14 h-14 bg-indigo-50 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-sm">
                      <Gift className="w-6 h-6 text-indigo-500" />
                    </div>
                    <h2 className="text-3xl font-serif text-gray-900">Final Touch</h2>
                    <p className="text-gray-500 text-sm">Select a reveal style.</p>
                  </div>
                  
                  {/* Cards Grid */}
                  <div className="grid md:grid-cols-2 gap-5">
                    {/* Basic Card */}
                    <div onClick={() => setFormData({ ...formData, plan: "basic" })} className={`relative p-6 rounded-3xl border-2 transition-all duration-300 cursor-pointer group ${formData.plan === "basic" ? "bg-white border-gray-900 shadow-xl scale-[1.02]" : "bg-white/40 border-transparent hover:bg-white/80 hover:border-gray-200 grayscale-[0.5] hover:grayscale-0"}`}>
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border border-gray-200 px-2 py-0.5 rounded">Option A</span>
                        {formData.plan === "basic" && <div className="w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-white"/></div>}
                      </div>
                      <span className="text-3xl font-serif text-gray-900">₹99</span>
                      <h3 className="font-bold text-gray-700 text-sm mt-1">Basic Reveal</h3>
                    </div>

                    {/* Magic Card */}
                    <div onClick={() => setFormData({ ...formData, plan: "magic" })} className={`relative p-6 rounded-3xl border-2 transition-all duration-300 cursor-pointer overflow-hidden group ${formData.plan === "magic" ? "bg-gradient-to-br from-white to-purple-50 border-purple-500 shadow-2xl shadow-purple-200/50 scale-[1.02]" : "bg-white/40 border-transparent hover:bg-white/80 hover:border-purple-200"}`}>
                      <div className="flex justify-between items-start mb-4 relative z-10">
                        <span className="text-[10px] font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 px-3 py-1 rounded-full shadow-sm flex items-center gap-1"><Star className="w-2 h-2 fill-white" /> POPULAR</span>
                        {formData.plan === "magic" && <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-white"/></div>}
                      </div>
                      <span className="text-3xl font-serif text-gray-900">₹499</span>
                      <h3 className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-sm mt-1">Magic Experience</h3>
                    </div>
                  </div>

                  {/* Details Panel */}
                  <motion.div layout className="bg-white/50 rounded-[2rem] border border-white/60 shadow-inner overflow-hidden">
                    <AnimatePresence mode="wait">
                      {formData.plan === "magic" ? (
                        <motion.div key="magic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 bg-gradient-to-b from-purple-50/50 to-transparent">
                          <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-4 h-4 text-purple-600" />
                            <span className="text-xs font-bold text-purple-900 uppercase tracking-wide">Included Magic Features</span>
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            {magicFeatures.map((f, i) => (
                              <div key={i} className={`flex flex-col items-center text-center p-3 bg-white rounded-2xl shadow-sm border border-purple-100/50 ${i >= 3 ? "col-span-1.5" : ""}`}>
                                <span className="text-2xl mb-1">{f.icon}</span>
                                <span className="text-[10px] font-bold text-gray-800">{f.title}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div key="basic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6">
                           <div className="space-y-3">
                            {basicFeatures.map((f, i) => (
                              <div key={i} className="flex items-center gap-4 p-3 bg-white rounded-2xl border border-gray-100">
                                <CheckCircle2 className="w-4 h-4 text-gray-400" />
                                <p className="text-xs font-bold text-gray-900">{f.title}</p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* --- FOOTER ACTIONS --- */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
            {step > 1 ? (
              <button onClick={prevStep} className="text-gray-400 text-sm font-medium hover:text-gray-800 transition flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : <div />}
            
            <motion.button 
              whileHover={isStepValid() ? { scale: 1.02 } : {}}
              whileTap={isStepValid() ? { scale: 0.98 } : {}}
              onClick={step === 4 ? handleCreate : nextStep} // Use handleCreate for Step 4
              disabled={!isStepValid()}
              className={`px-8 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 transition-all ${
                isStepValid() 
                  ? step === 4
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-pink-200 cursor-pointer" 
                    : "bg-gray-900 text-white hover:bg-gray-800 cursor-pointer"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
              }`}
            >
              {step === 4 ? (
                <>Create Gift <Sparkles className="w-4 h-4 animate-pulse" /></>
              ) : (
                <>Next Step <ArrowRight className="w-4 h-4" /></>
              )}
            </motion.button>
          </div>

        </motion.div>
      </div>
    </div>
  );
}