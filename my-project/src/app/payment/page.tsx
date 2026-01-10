"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CreditCard, Smartphone, ShieldCheck, Lock, 
  QrCode, Check, ArrowRight 
} from "lucide-react";
import Confetti from "react-confetti"; 

// --- 1. COMPONENTS ---

const AnimatedCheck = () => (
  <div className="relative w-24 h-24 mx-auto mb-6">
    <motion.svg viewBox="0 0 50 50" className="w-full h-full drop-shadow-lg">
      <motion.circle cx="25" cy="25" r="23" fill="#10B981" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4, ease: "backOut" }} />
      <motion.path d="M14 26 L22 33 L36 16" fill="transparent" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }} />
    </motion.svg>
  </div>
);

// --- 2. DATA ---

const giftFacts = [
  "Did you know? Giving gifts activates the same part of the brain as eating chocolate! 🍫",
  "Digital memories don't fade, tear, or get lost. They are forever. ✨",
  "Surprises trigger a release of dopamine, the 'feel-good' hormone. 🧠",
  "Thoughtful gifts strengthen relationships more than expensive ones. ❤️",
  "We are securing your memories on the blockchain now... 🔒"
];

export default function PaymentPage() {
  const router = useRouter();
  const [view, setView] = useState<"payment" | "success" | "loading">("payment");
  const [method, setMethod] = useState<"upi" | "card">("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [factIndex, setFactIndex] = useState(0);
  
  // Confetti Window Size
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  // Cycle Facts during Loading Phase
  useEffect(() => {
    if (view === "loading") {
      const interval = setInterval(() => {
        setFactIndex((prev) => (prev + 1) % giftFacts.length);
      }, 2500); // Change fact every 2.5s
      return () => clearInterval(interval);
    }
  }, [view]);

  // --- HANDLERS ---

  const handlePayment = () => {
    setIsProcessing(true);
    // 1. Simulate Gateway (2s)
    setTimeout(() => {
      setIsProcessing(false);
      setView("success");
      
      // 2. Stay on Success Screen (3s)
      setTimeout(() => {
        setView("loading");
        
        // 3. Stay on Loading/Facts Screen (6s) then Redirect
        setTimeout(() => {
           router.push("/gift");
        }, 6000);
        
      }, 3000);
    }, 2000);
  };

  const plan = { name: "Magic Experience", price: 499, tax: 90 };
  const total = plan.price + plan.tax;

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#FDFCFD] font-sans flex items-center justify-center p-4 md:p-8">
      
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-100/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-pink-50/50 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      <div className="max-w-5xl w-full relative z-10">
        <AnimatePresence mode="wait">

          {/* --- VIEW 1: PAYMENT FORM --- */}
          {view === "payment" && (
            <motion.div 
              key="payment"
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
               <h1 className="text-3xl md:text-4xl font-serif text-gray-900 text-center mb-8">Secure Payment</h1>

               <div className="grid lg:grid-cols-12 gap-8">
                  {/* Left: Methods */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex gap-4">
                      <button onClick={() => setMethod("upi")} className={`flex-1 py-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${method === "upi" ? "bg-white border-purple-500 shadow-lg text-purple-700" : "bg-white/40 border-transparent hover:bg-white/60 text-gray-500"}`}>
                        <Smartphone className="w-6 h-6" /> <span className="font-bold text-sm">UPI / QR</span>
                      </button>
                      <button onClick={() => setMethod("card")} className={`flex-1 py-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${method === "card" ? "bg-white border-purple-500 shadow-lg text-purple-700" : "bg-white/40 border-transparent hover:bg-white/60 text-gray-500"}`}>
                        <CreditCard className="w-6 h-6" /> <span className="font-bold text-sm">Card</span>
                      </button>
                    </div>

                    <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[2rem] p-8 shadow-xl min-h-[400px]">
                      {method === "upi" ? (
                        <div className="space-y-6 text-center">
                          <div className="bg-white p-6 rounded-3xl shadow-inner border border-gray-100 inline-block"><QrCode className="w-32 h-32 text-gray-800 mx-auto opacity-80" /></div>
                          <p className="text-sm text-gray-500">Scan with any UPI App</p>
                          <div className="flex justify-center gap-4">
                            {["GPay", "PhonePe", "Paytm"].map((app) => (
                              <button key={app} className="px-6 py-2 rounded-full border border-gray-200 bg-white hover:border-purple-200 hover:text-purple-600 transition-colors text-sm font-bold text-gray-600">{app}</button>
                            ))}
                          </div>
                          <input type="text" placeholder="example@okhdfc" className="w-full bg-white/50 border border-gray-200 rounded-xl p-4 text-center focus:ring-2 focus:ring-purple-100 outline-none" />
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div className="w-full h-48 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-700 p-6 flex flex-col justify-between text-white shadow-xl relative overflow-hidden">
                             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                             <div className="flex justify-between items-start"><div className="w-12 h-8 bg-yellow-500/80 rounded-md"></div><span className="font-mono text-lg tracking-widest opacity-80">VISA</span></div>
                             <div><div className="font-mono text-xl tracking-widest mb-1">•••• •••• •••• 4242</div><div className="flex justify-between text-xs opacity-70 uppercase"><span>Card Holder</span><span>Expires</span></div></div>
                          </div>
                          <div className="space-y-4">
                            <input type="text" placeholder="Card Number" className="w-full bg-white/50 border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-purple-100" />
                            <div className="grid grid-cols-2 gap-4">
                              <input type="text" placeholder="MM / YY" className="w-full bg-white/50 border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-purple-100" />
                              <input type="text" placeholder="CVV" className="w-full bg-white/50 border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-purple-100" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Summary */}
                  <div className="lg:col-span-5">
                    <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-8 shadow-2xl h-full flex flex-col">
                      <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                      <div className="flex-1 space-y-6">
                        <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
                          <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl flex items-center justify-center text-2xl shadow-sm">🎁</div>
                          <div><h3 className="font-bold text-gray-900">{plan.name}</h3><p className="text-xs text-gray-500 mt-1">Includes Animations, Media Uploads & Forever Hosting.</p></div>
                        </div>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>₹{plan.price}</span></div>
                          <div className="flex justify-between text-gray-600"><span>Tax (18% GST)</span><span>₹{plan.tax}</span></div>
                          <div className="flex justify-between font-bold text-lg text-gray-900 pt-3 border-t border-gray-100"><span>Total</span><span>₹{total}</span></div>
                        </div>
                        <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-3 flex gap-2 items-start"><ShieldCheck className="w-4 h-4 text-yellow-600 mt-0.5" /><p className="text-xs text-yellow-800 leading-relaxed"><strong>100% Money Back Guarantee.</strong> No questions asked.</p></div>
                      </div>
                      <div className="mt-8">
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handlePayment} disabled={isProcessing} className="w-full py-4 rounded-xl bg-gray-900 text-white font-bold text-lg shadow-xl shadow-purple-200 hover:shadow-purple-300 transition-all flex items-center justify-center gap-2 relative overflow-hidden">
                          {isProcessing ? <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Processing...</span> : <>Pay ₹{total} <Lock className="w-4 h-4 opacity-70" /></>}
                        </motion.button>
                      </div>
                    </div>
                  </div>
               </div>
            </motion.div>
          )}

          {/* --- VIEW 2: SUCCESS CELEBRATION --- */}
          {view === "success" && (
            <motion.div 
              key="success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex flex-col items-center justify-center min-h-[50vh] text-center"
            >
              <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={800} gravity={0.2} />
              
              <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[3rem] p-12 shadow-2xl max-w-md w-full">
                <AnimatedCheck />
                <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-4xl font-serif text-gray-900 mb-4"
                >
                  Payment Successful!
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-gray-500 font-medium"
                >
                  Your magical gift has been created and secured on the blockchain.
                </motion.p>
              </div>
            </motion.div>
          )}

          {/* --- VIEW 3: LOADING FACTS (The "Wrapping" Screen) --- */}
          {view === "loading" && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-2xl mx-auto"
            >
              {/* Custom Heart Loader */}
              <div className="relative w-32 h-32 mb-12">
                <motion.div 
                   animate={{ scale: [1, 1.1, 1] }}
                   transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute inset-0 bg-pink-100 rounded-full opacity-50 blur-xl"
                />
                <div className="relative w-full h-full border-4 border-pink-100 rounded-full flex items-center justify-center">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-4 border-t-pink-500 border-r-transparent border-b-transparent border-l-transparent rounded-full"
                  />
                  <div className="text-4xl animate-pulse">🎁</div>
                </div>
              </div>

              {/* Animated Facts Text */}
              <div className="h-32 flex items-center justify-center relative w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={factIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="absolute w-full px-4"
                  >
                    <h3 className="text-2xl font-serif text-gray-900 italic leading-relaxed">
                      "{giftFacts[factIndex]}"
                    </h3>
                  </motion.div>
                </AnimatePresence>
              </div>

              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 6 }}
                className="w-64 h-1.5 bg-gray-100 rounded-full mt-8 overflow-hidden"
              >
                <div className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" style={{ width: "100%", transition: "width 6s linear" }}></div>
              </motion.div>
              
              <p className="text-xs text-gray-400 mt-4 font-bold uppercase tracking-widest animate-pulse">
                Preparing your surprise...
              </p>

            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}